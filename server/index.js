import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Account from './models/Account.js'
import Run from './models/Run.js'

const app = express()
const port = Number(process.env.PORT || 4000)
const unlockAt = Date.parse('2026-10-27T07:00:00+00:00') // Ghana time is UTC
const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../client/dist')

const allowedOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',').map((origin) => origin.trim()).filter(Boolean)
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('This website is not allowed to access the birthday game API.'))
  },
}))
app.use(express.json({ limit: '10kb' }))
app.use('/api', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.query.preview === '1') {
    return res.status(404).json({ error: 'Not found.' })
  }
  next()
})

function accountView(account) {
  const points = account?.points || 0
  return {
    points,
    cashedOut: Boolean(account?.cashedOut),
    totalRuns: account?.totalRuns || 0,
    ...(account?.cashedOut ? { claimedAmount: account.cashout?.amount || 50 } : {}),
  }
}

// One game is the full three-life run: base GH₵50 + GH₵2 per second + GH₵5 per gift.
// A game and the lifetime balance both cap at GH₵500.
function calculateRoundReward(seconds, gifts) {
  return Math.min(500, 50 + 2 * seconds + 5 * gifts)
}

function getAccountId(req) {
  return req.query.preview === '1' ? 'ella-preview' : 'ella'
}

function isPreviewRequest(req) {
  return req.query.preview === '1'
}

app.get('/api/config', (_req, res) => {
  const remainingMs = Math.max(0, unlockAt - Date.now())
  res.json({ unlocked: remainingMs === 0, remainingMs, unlockAt: new Date(unlockAt).toISOString(), timezone: 'Africa/Accra' })
})

app.get('/api/account', async (req, res) => {
  try {
    const account = await Account.findById(getAccountId(req)).lean()
    res.json(accountView(account))
  } catch (error) {
    res.status(503).json({ error: 'Birthday game storage is unavailable.' })
  }
})

app.get('/api/cashout/quote', async (req, res) => {
  if (!isPreviewRequest(req) && Date.now() < unlockAt) return res.status(403).json({ error: 'The birthday game has not opened yet.' })
  try {
    const account = await Account.findById(getAccountId(req)).lean()
    if (account?.cashedOut) return res.status(409).json({ error: 'This birthday surprise has already been claimed.' })
    res.json({ amount: Math.max(50, Math.min(500, account?.earned || 0)) })
  } catch {
    res.status(503).json({ error: 'Could not prepare the birthday surprise just yet.' })
  }
})

app.post('/api/runs', async (req, res) => {
  const { points, gifts, seconds } = req.body || {}
  if (!Number.isSafeInteger(points) || !Number.isSafeInteger(gifts) || !Number.isSafeInteger(seconds) || points !== gifts * 100 || gifts < 0 || gifts > 500 || seconds < 0 || seconds > 120) {
    return res.status(400).json({ error: 'That run score could not be saved.' })
  }
  if (!isPreviewRequest(req) && Date.now() < unlockAt) return res.status(403).json({ error: 'The birthday game has not opened yet.' })
  try {
    const accountId = getAccountId(req)
    const preview = isPreviewRequest(req)
    const roundReward = calculateRoundReward(seconds, gifts)
    const account = await Account.findByIdAndUpdate(accountId, [{
      $set: {
        points: { $min: [9000, { $add: [{ $ifNull: ['$points', 0] }, points] }] },
        earned: { $min: [500, { $add: [{ $ifNull: ['$earned', 0] }, roundReward] }] },
        totalRuns: { $add: [{ $ifNull: ['$totalRuns', 0] }, 1] },
      },
    }], { new: true, upsert: true })
    await Run.create({ accountId, preview, points, gifts, survivalSeconds: seconds, roundReward })
    res.json(accountView(account))
  } catch {
    res.status(503).json({ error: 'Could not save this run. Please try again.' })
  }
})

app.post('/api/cashout', async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 80) : ''
  const mobile = typeof req.body?.mobile === 'string' ? req.body.mobile.trim().slice(0, 20) : ''
  const rating = Number(req.body?.rating)
  if (name.length < 2 || !/^[+\d][\d\s()-]{6,19}$/.test(mobile) || !Number.isInteger(rating) || rating < 1 || rating > 10) {
    return res.status(400).json({ error: 'Please check your name, mobile number, and rating.' })
  }
  if (!isPreviewRequest(req) && Date.now() < unlockAt) return res.status(403).json({ error: 'The birthday game has not opened yet.' })
  try {
    const accountId = getAccountId(req)
    const claimed = await Account.findOneAndUpdate(
      { _id: accountId, cashedOut: { $ne: true } },
      [{ $set: {
        cashedOut: true,
        cashout: {
          name, mobile, rating,
          amount: { $min: [500, { $max: [50, { $ifNull: ['$earned', 0] }] }] },
          submittedAt: new Date(),
        },
      } }],
      { new: true, upsert: true },
    )
    if (!claimed) return res.status(409).json({ error: 'This birthday surprise has already been claimed.' })
    res.json({ account: accountView(claimed) })
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ error: 'This birthday surprise has already been claimed.' })
    res.status(503).json({ error: 'Could not submit your claim. Please try again.' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }))

app.use(express.static(clientDist))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(clientDist, 'index.html'), (error) => { if (error) next() })
})

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection failed:', error.message))
} else {
  console.warn('MONGODB_URI is missing. Set it in server/.env to enable saved scores and cashouts.')
}

app.listen(port, () => console.log(`Birthday game API listening on http://localhost:${port}`))
