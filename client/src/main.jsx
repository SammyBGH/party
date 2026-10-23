import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUp, CakeSlice, Check, Cherry, ChevronRight, Clock3, Flag, Gift, Heart, Magnet, MapPin, Shield, Star, Trophy, Vibrate, Volume2, VolumeX, X } from 'lucide-react'
import './styles.css'

const API = `${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api`
const TARGET = '2026-10-27T12:00:00+00:00' // Accra is UTC in October
const DEV_PREVIEW = new URLSearchParams(window.location.search).get('preview') === '1'
const fmtMoney = (n) => `GH₵${Number(n || 0).toFixed(2)}`

function SlimePortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="A little green birthday slime">
    <ellipse cx="91" cy="169" rx="55" ry="9" fill="#1b102f" opacity=".22" />
    <path d="M38 160c-9-9-7-28-1-44l15-44c4-12 12-19 23-16 4-13 14-18 24-12 9-13 26-10 31 6 12-2 19 6 22 20l12 48c5 19 2 35-9 42-20 13-96 15-117 0Z" fill="#8edb62" stroke="#315f52" strokeWidth="5" strokeLinejoin="round" />
    <path d="M51 107c7-20 12-38 21-45 5-4 10-1 13 4 8-13 16-15 22-7 11-11 22-7 26 6 10-1 15 6 18 19" fill="none" stroke="#c5f29a" strokeWidth="7" strokeLinecap="round" opacity=".8" />
    <path d="m79 61 14-31 16 34" fill="#ee797f" stroke="#315f52" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="94" cy="31" r="5" fill="#ffd36f" stroke="#315f52" strokeWidth="3" />
    <ellipse cx="118" cy="100" rx="7" ry="10" fill="#fff6dc"/><ellipse cx="139" cy="103" rx="6" ry="9" fill="#fff6dc"/>
    <circle cx="120" cy="102" r="3.5" fill="#29253e"/><circle cx="141" cy="105" r="3" fill="#29253e"/>
    <path d="M121 123q10 11 20 0" fill="none" stroke="#315f52" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="111" cy="122" rx="6" ry="3" fill="#ef8d83" opacity=".8" />
  </svg>
}

function CatPortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="Miso, the birthday street cat">
    <ellipse cx="91" cy="169" rx="55" ry="9" fill="#1b102f" opacity=".22" />
    <path d="M46 133c-22-13-18-36-4-40 10-3 18 8 16 18-3 11-1 22 5 28" fill="#cc7856" stroke="#493249" strokeWidth="5" strokeLinecap="round" />
    <path d="M47 144c-8-28 3-51 21-55 9-24 48-30 66-7 15 19 11 47 3 62-15 16-73 18-90 0Z" fill="#d99669" stroke="#493249" strokeWidth="5" strokeLinejoin="round" />
    <path d="m66 94 1-32 26 21m14-1 24-22 5 37" fill="#d99669" stroke="#493249" strokeWidth="5" strokeLinejoin="round" />
    <path d="m73 82 1-10 11 9m34-2 9-9 2 15" fill="#e7a5a0" />
    <path d="M77 121c8 10 32 14 45 1 8-8 3-20-6-23-12-5-34-3-43 5-6 5-3 13 4 17Z" fill="#f1d3b7" />
    <ellipse cx="116" cy="102" rx="5" ry="7" fill="#fff3dc"/><ellipse cx="133" cy="103" rx="4.5" ry="6.5" fill="#fff3dc"/>
    <circle cx="118" cy="103" r="2.5" fill="#29253e"/><circle cx="135" cy="104" r="2.3" fill="#29253e"/>
    <path d="m107 116 6-3 5 3-5 4Z" fill="#b96366"/><path d="M118 120q5 6 10 0" fill="none" stroke="#493249" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="m106 119-20-3m20 7-20 3m36-6 18-4m-18 8 18 3" stroke="#72544a" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M60 151q16 8 31 0m20 3q15 7 28-1" fill="none" stroke="#f1d3b7" strokeWidth="9" strokeLinecap="round"/>
    <path d="M94 139h20l-3 12-8 5-8-5Z" fill="#8eaaa0" stroke="#493249" strokeWidth="3"/><circle cx="104" cy="146" r="3" fill="#efc878"/>
  </svg>
}

function CrabPortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="Kofi, the beach crab">
    <ellipse cx="91" cy="169" rx="55" ry="9" fill="#1b102f" opacity=".22" />
    <path d="m56 132-17 16m30-11-12 22m49-24 12 21m5-27 19 17" fill="none" stroke="#ac624d" strokeWidth="7" strokeLinecap="round" />
    <path d="M57 111c0-24 16-42 39-42s40 18 40 42c0 22-18 36-40 36s-39-14-39-36Z" fill="#e47d61" stroke="#493249" strokeWidth="5" />
    <path d="M68 102q28-28 57 0m-60 13q32-18 62 0m-56 14q24-11 49 0" fill="none" stroke="#f6ad78" strokeWidth="4" strokeLinecap="round" />
    <path d="M75 75 65 56m38 20 8-23" stroke="#493249" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="63" cy="53" rx="10" ry="12" fill="#fff3dc" stroke="#493249" strokeWidth="3"/><ellipse cx="114" cy="50" rx="10" ry="12" fill="#fff3dc" stroke="#493249" strokeWidth="3"/>
    <circle cx="67" cy="54" r="3.5" fill="#29253e"/><circle cx="117" cy="51" r="3.5" fill="#29253e"/>
    <path d="M58 98 42 80m80 15 17-19" fill="none" stroke="#ac624d" strokeWidth="7" strokeLinecap="round"/>
    <path d="M42 81c-14-6-17-21-8-26 7-4 14 1 16 7 5-5 14-5 17 2 5 10-8 19-25 17Zm96-4c14-7 16-22 7-26-7-3-14 2-16 8-6-5-14-4-17 3-4 10 9 18 26 15Z" fill="#e88c68" stroke="#493249" strokeWidth="4" strokeLinejoin="round" />
    <path d="M83 143h17l-2 10-7 5-7-5Z" fill="#8eaaa0" stroke="#493249" strokeWidth="3"/><circle cx="91" cy="149" r="3" fill="#efc878"/>
  </svg>
}

const CHARACTERS = [
  { id: 'slime', name: 'Bloop', detail: 'A bouncy classic' },
  { id: 'cat', name: 'Miso', detail: 'Quick little paws' },
  { id: 'crab', name: 'Kofi', detail: 'Straight from the shore' },
]

function CharacterPortrait({ characterId }) {
  if (characterId === 'cat') return <CatPortrait />
  if (characterId === 'crab') return <CrabPortrait />
  return <SlimePortrait />
}

function ParcelIcon() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" className="parcel-icon">
    <path d="M7 17h34v25H7z" fill="#d8a66c" stroke="#493249" strokeWidth="3" strokeLinejoin="round" />
    <path d="M7 17h34v8H7z" fill="#efcf91" stroke="#493249" strokeWidth="3" strokeLinejoin="round" />
    <path d="M21 17v25m6-25v25" stroke="#b96768" strokeWidth="4" />
    <path d="M24 17c-13 0-15-12-8-12 5 0 8 7 8 12Zm0 0c13 0 15-12 8-12-5 0-8 7-8 12Z" fill="#df8178" stroke="#493249" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
}

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius)
}

function createGame() {
  return { phase: 'intro', elapsed: 0, speed: 310, groundOffset: 0, playerY: 0, playerVY: 0, grounded: true, obstacles: [], gifts: [], powerups: [], particles: [], obstacleTimer: 1.25, giftTimer: 1.1, powerupTimer: 8, giftsCount: 0, lives: 3, shieldTimer: 0, magnetTimer: 0, powerupMessage: '', powerupMessageTimer: 0, invulnerableUntil: 0, resurrectionTimer: 0, overAt: 0 }
}

function drawSlime(ctx, x, groundY, jumpY, elapsed, phase) {
  const squash = phase === 'playing' && jumpY === 0 ? Math.sin(elapsed * 19) * 1.5 : 0
  const w = 60, h = 54, base = groundY - jumpY + squash
  ctx.save()
  ctx.globalAlpha = .24
  ctx.fillStyle = '#170e36'
  ctx.beginPath(); ctx.ellipse(x + 30, groundY + 3, Math.max(15, 28 - jumpY * .08), 7, 0, 0, Math.PI * 2); ctx.fill()
  ctx.restore()

  ctx.save()
  const body = ctx.createLinearGradient(x, base - h, x + w, base)
  body.addColorStop(0, '#d4ff84'); body.addColorStop(.38, '#8de84f'); body.addColorStop(1, '#3fbd76')
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.moveTo(x + 5, base)
  ctx.quadraticCurveTo(x - 2, base - 7, x + 5, base - 25)
  ctx.bezierCurveTo(x + 9, base - 43, x + 20, base - 51, x + 31, base - 47)
  ctx.bezierCurveTo(x + 37, base - 59, x + 54, base - 50, x + 56, base - 34)
  ctx.quadraticCurveTo(x + 65, base - 13, x + 57, base)
  ctx.closePath(); ctx.fill()
  ctx.strokeStyle = '#dcffae'; ctx.lineWidth = 2; ctx.stroke()
  ctx.fillStyle = '#ffffff80'; ctx.beginPath(); ctx.ellipse(x + 21, base - 39, 8, 3.5, -.6, 0, Math.PI * 2); ctx.fill()

  // Eyes and smile face the direction the slime runs: right.
  ctx.fillStyle = '#fffdf0'
  ctx.beginPath(); ctx.ellipse(x + 41, base - 32, 5, 7, -.12, 0, Math.PI * 2); ctx.ellipse(x + 51, base - 30, 4.4, 6, -.12, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#25304c'
  ctx.beginPath(); ctx.arc(x + 43.5, base - 31, 2.6, 0, Math.PI * 2); ctx.arc(x + 53, base - 29, 2.4, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#275443'; ctx.lineWidth = 2; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(x + 44, base - 17); ctx.quadraticCurveTo(x + 49, base - 12, x + 55, base - 17); ctx.stroke()
  ctx.fillStyle = '#ff8e9d'; ctx.globalAlpha = .8
  ctx.beginPath(); ctx.ellipse(x + 37, base - 19, 4.4, 2.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1

  // A tiny party hat makes the hero part of the birthday world.
  ctx.fillStyle = '#ff7098'; ctx.strokeStyle = '#fff2a8'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(x + 27, base - 49); ctx.lineTo(x + 36, base - 72); ctx.lineTo(x + 45, base - 48); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#ffdd72'; ctx.beginPath(); ctx.arc(x + 36, base - 72, 3.3, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawCat(ctx, x, groundY, jumpY, elapsed, vy, phase) {
  const airborne = jumpY > 2
  const falling = airborne && vy < -80
  const running = phase === 'playing'
  const stride = running ? Math.sin(elapsed * 19) : 0
  const base = groundY - jumpY - (!airborne && running ? Math.abs(stride) * 1.8 : 0)
  ctx.save()
  ctx.globalAlpha = .22; ctx.fillStyle = '#17111f'; ctx.beginPath(); ctx.ellipse(x + 30, groundY + 3, Math.max(15, 27 - jumpY * .08), 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1
  // Paws cycle opposite each other on the ground, tuck in the jump, and reach on descent.
  const pawReach = falling ? 8 : airborne ? -5 : 0
  const legSwing = airborne ? 2 : stride * 7
  ctx.strokeStyle = '#a85f49'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath()
  ctx.moveTo(x + 21, base - 10); ctx.lineTo(x + 18 - legSwing, base + 2 + pawReach)
  ctx.moveTo(x + 31, base - 10); ctx.lineTo(x + 30 + legSwing, base + 2 + pawReach)
  ctx.moveTo(x + 43, base - 10); ctx.lineTo(x + 42 + legSwing, base + 2 + pawReach)
  ctx.moveTo(x + 53, base - 10); ctx.lineTo(x + 55 - legSwing, base + 2 + pawReach); ctx.stroke()
  // Tail counter-swings during the run and streams behind during airtime.
  ctx.strokeStyle = '#a85f49'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x + 14, base - 20); ctx.quadraticCurveTo(x - 3, base - 32 - stride * 3, x + (airborne ? 1 : 7 + stride * 4), base - (falling ? 54 : 47)); ctx.stroke()
  ctx.save(); ctx.translate(x + 36, base - 26); ctx.rotate(airborne ? (falling ? -.12 : .1) : stride * .035); ctx.translate(-(x + 36), -(base - 26))
  ctx.fillStyle = '#d99669'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(x + 10, base - 4); ctx.quadraticCurveTo(x + 7, base - 31, x + 20, base - 43); ctx.lineTo(x + 22, base - 59); ctx.lineTo(x + 35, base - 47); ctx.quadraticCurveTo(x + 45, base - 51, x + 51, base - 45); ctx.lineTo(x + 61, base - 59); ctx.lineTo(x + 62, base - 39); ctx.quadraticCurveTo(x + 69, base - 21, x + 58, base - 4); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#e7a5a0'; ctx.beginPath(); ctx.moveTo(x + 24, base - 48); ctx.lineTo(x + 24, base - 54); ctx.lineTo(x + 30, base - 49); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 54, base - 48); ctx.lineTo(x + 60, base - 54); ctx.lineTo(x + 59, base - 45); ctx.fill()
  ctx.fillStyle = '#fff3dc'; ctx.beginPath(); ctx.ellipse(x + 43, base - 32, 4.5, 6, 0, 0, Math.PI * 2); ctx.ellipse(x + 54, base - 31, 4, 5.5, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#29253e'; ctx.beginPath(); ctx.arc(x + 45, base - 31, 2.4, 0, Math.PI * 2); ctx.arc(x + 56, base - 30, 2.2, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#b96366'; ctx.beginPath(); ctx.moveTo(x + 48, base - 20); ctx.lineTo(x + 53, base - 23); ctx.lineTo(x + 57, base - 20); ctx.lineTo(x + 53, base - 17); ctx.fill()
  ctx.strokeStyle = '#493249'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 53, base - 17); ctx.quadraticCurveTo(x + 58, base - 13, x + 62, base - 17); ctx.stroke()
  ctx.strokeStyle = '#72544a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 48, base - 18); ctx.lineTo(x + 36, base - 15); ctx.moveTo(x + 55, base - 18); ctx.lineTo(x + 66, base - 14); ctx.stroke()
  ctx.fillStyle = '#8eaaa0'; ctx.beginPath(); ctx.moveTo(x + 21, base - 17); ctx.lineTo(x + 43, base - 17); ctx.lineTo(x + 39, base - 9); ctx.lineTo(x + 31, base - 6); ctx.lineTo(x + 23, base - 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#efc878'; ctx.beginPath(); ctx.arc(x + 32, base - 14, 2, 0, Math.PI * 2); ctx.fill()
  ctx.restore(); ctx.restore()
}

function drawCrab(ctx, x, groundY, jumpY, elapsed, vy, phase) {
  const airborne = jumpY > 2
  const falling = airborne && vy < -80
  const running = phase === 'playing'
  const stride = running ? Math.sin(elapsed * 17) : 0
  const base = groundY - jumpY - (!airborne && running ? Math.abs(stride) * 1.5 : 0)
  ctx.save()
  ctx.globalAlpha = .22; ctx.fillStyle = '#17111f'; ctx.beginPath(); ctx.ellipse(x + 30, groundY + 3, Math.max(15, 27 - jumpY * .08), 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1
  ctx.save(); ctx.translate(x + 31, base - 24); ctx.rotate(airborne ? (falling ? -.1 : .1) : stride * .045); ctx.translate(-(x + 31), -(base - 24))
  ctx.fillStyle = '#e47d61'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.ellipse(x + 31, base - 24, 29, 20, 0, Math.PI, Math.PI * 2); ctx.lineTo(x + 60, base - 19); ctx.quadraticCurveTo(x + 31, base + 1, x + 2, base - 19); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.strokeStyle = '#f6ad78'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + 31, base - 23, 20, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke()
  // Six alternating legs give Kofi a quick sideways scuttle; airborne legs tuck, then reach to land.
  ctx.strokeStyle = '#ac624d'; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.beginPath()
  for (let i = 0; i < 3; i++) {
    const offset = airborne ? (falling ? 3 : -2) : stride * (i % 2 ? -6 : 6)
    const leftX = x + 10 + i * 9, rightX = x + 52 - i * 9
    const legEndY = falling ? base + 2 : airborne ? base - 8 : base + 2
    ctx.moveTo(leftX, base - 17); ctx.lineTo(leftX - 6 + offset, legEndY)
    ctx.moveTo(rightX, base - 17); ctx.lineTo(rightX + 6 - offset, legEndY)
  }
  ctx.stroke()
  ctx.strokeStyle = '#493249'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + 20, base - 39); ctx.lineTo(x + 18, base - 47); ctx.moveTo(x + 43, base - 39); ctx.lineTo(x + 45, base - 47); ctx.stroke()
  ctx.fillStyle = '#fff3dc'; ctx.beginPath(); ctx.arc(x + 17, base - 49, 6, 0, Math.PI * 2); ctx.arc(x + 46, base - 49, 6, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#29253e'; ctx.beginPath(); ctx.arc(x + 19, base - 49, 2, 0, Math.PI * 2); ctx.arc(x + 48, base - 49, 2, 0, Math.PI * 2); ctx.fill()
  // Claws bob opposite each other in a scuttle and sweep forward to balance a jump.
  const clawLift = airborne ? (falling ? 2 : 8) : stride * 3
  ctx.strokeStyle = '#ac624d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 4, base - 27); ctx.lineTo(x - 2, base - 38 - clawLift); ctx.lineTo(x - 6, base - 42 - clawLift); ctx.moveTo(x + 57, base - 27); ctx.lineTo(x + 63, base - 38 + clawLift); ctx.lineTo(x + 67, base - 42 + clawLift); ctx.stroke()
  ctx.fillStyle = '#e88c68'; ctx.beginPath(); ctx.arc(x - 7, base - 44 - clawLift, 6, .2, Math.PI * 1.85); ctx.arc(x + 68, base - 44 + clawLift, 6, 1.3, Math.PI * 2.95); ctx.fill()
  ctx.restore(); ctx.restore()
}

function drawCharacter(ctx, character, x, groundY, jumpY, elapsed, phase, playerVY) {
  if (character === 'cat') drawCat(ctx, x, groundY, jumpY, elapsed, playerVY, phase)
  else if (character === 'crab') drawCrab(ctx, x, groundY, jumpY, elapsed, playerVY, phase)
  else drawSlime(ctx, x, groundY, jumpY, elapsed, phase)
}

function createArcadeAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  const context = new AudioContextClass()
  let musicTimer = null, noteIndex = 0
  const note = (frequency, duration = .14, volume = .04, delay = 0, wave = 'sine') => {
    if (context.state === 'closed') return
    const start = context.currentTime + delay, oscillator = context.createOscillator(), gain = context.createGain()
    oscillator.type = wave; oscillator.frequency.setValueAtTime(frequency, start)
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .018); gain.gain.exponentialRampToValueAtTime(.0001, start + duration)
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(start); oscillator.stop(start + duration + .02)
  }
  const play = (name) => {
    if (name === 'jump') { note(490, .09, .025, 0, 'triangle'); note(650, .1, .019, .045, 'triangle') }
    if (name === 'parcel') { note(740, .11, .035, 0, 'sine'); note(988, .16, .03, .07, 'sine') }
    if (name === 'shield') { note(587, .12, .025); note(784, .13, .025, .07); note(988, .16, .02, .14) }
    if (name === 'magnet') { note(440, .13, .022); note(554, .16, .022, .08) }
    if (name === 'hit') { note(185, .16, .045, 0, 'triangle'); note(138, .13, .03, .09, 'triangle') }
    if (name === 'revive') [440, 554, 659, 880].forEach((frequency, i) => note(frequency, .24, .025, i * .12, 'sine'))
    if (name === 'over') [392, 330, 262].forEach((frequency, i) => note(frequency, .24, .025, i * .17, 'triangle'))
  }
  const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46]
  return {
    resume: () => context.state === 'suspended' ? context.resume() : Promise.resolve(),
    play,
    startMusic() {
      if (musicTimer) return
      noteIndex = 0
      musicTimer = window.setInterval(() => {
        note(melody[noteIndex % melody.length], .19, .012, 0, 'triangle')
        noteIndex += 1
      }, 360)
    },
    stopMusic() { if (musicTimer) { window.clearInterval(musicTimer); musicTimer = null } },
    dispose() { this.stopMusic(); context.close() },
  }
}

function drawObstacle(ctx, item, groundY, elapsed) {
  const { x, type } = item
  ctx.save()
  ctx.translate(x, groundY)
  ctx.fillStyle = '#1f103d55'; ctx.beginPath(); ctx.ellipse(item.w / 2, 2, item.w * .55, 6, 0, 0, Math.PI * 2); ctx.fill()
  if (type === 'cupcake') {
    ctx.fillStyle = '#dd925a'; ctx.beginPath(); ctx.moveTo(7, -5); ctx.lineTo(12, -35); ctx.lineTo(item.w - 10, -35); ctx.lineTo(item.w - 4, -5); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = '#ffe2a3'; ctx.lineWidth = 2
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(14 + i * 10, -30); ctx.lineTo(16 + i * 10, -8); ctx.stroke() }
    ctx.fillStyle = '#ff94b0'; ctx.beginPath(); ctx.arc(item.w / 2, -38, 17, Math.PI, 0); ctx.lineTo(item.w - 1, -32); ctx.quadraticCurveTo(item.w - 7, -24, item.w - 12, -33); ctx.quadraticCurveTo(item.w / 2, -26, 9, -33); ctx.quadraticCurveTo(2, -25, 1, -34); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#fff4ad'; ctx.beginPath(); ctx.arc(item.w / 2, -53, 3.5, 0, Math.PI * 2); ctx.fill()
  } else if (type === 'cake') {
    roundedRect(ctx, 2, -item.h, item.w - 4, item.h - 3, 9); ctx.fillStyle = '#ffb6c5'; ctx.fill()
    ctx.fillStyle = '#fff0be'; roundedRect(ctx, 4, -item.h + 16, item.w - 8, 7, 3); ctx.fill()
    ctx.fillStyle = '#e96f9e'
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(13 + i * 16, -item.h + 5, 3, 0, Math.PI * 2); ctx.fill() }
    ctx.strokeStyle = '#ffe585'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(item.w / 2, -item.h); ctx.lineTo(item.w / 2, -item.h - 13); ctx.stroke()
    ctx.fillStyle = '#ff9762'; ctx.beginPath(); ctx.ellipse(item.w / 2, -item.h - 15, 3, 5 + Math.sin(elapsed * 15) * 1.2, 0, 0, Math.PI * 2); ctx.fill()
  } else {
    ctx.strokeStyle = '#ffdc79'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(item.w / 2, -4); ctx.lineTo(item.w / 2, -item.h + 5); ctx.stroke()
    ctx.fillStyle = '#f779a4'; ctx.beginPath(); ctx.arc(item.w / 2, -item.h + 5, 15, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = '#fff0ba'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(item.w / 2, -item.h + 5, 9, elapsed * 2, elapsed * 2 + Math.PI * 1.55); ctx.stroke()
    ctx.fillStyle = '#ffe788'; ctx.beginPath(); ctx.arc(item.w / 2, -item.h - 11, 4, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

function drawGift(ctx, gift, elapsed) {
  const y = gift.y + Math.sin(elapsed * 5 + gift.phase) * 5
  ctx.save(); ctx.translate(gift.x, y)
  ctx.fillStyle = '#30273855'; ctx.beginPath(); ctx.ellipse(0, 15, 14, 3, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#d9ad78'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(-12, -7); ctx.lineTo(0, -12); ctx.lineTo(12, -7); ctx.lineTo(12, 8); ctx.lineTo(0, 13); ctx.lineTo(-12, 8); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 13); ctx.moveTo(-12, -7); ctx.lineTo(0, -2); ctx.lineTo(12, -7); ctx.stroke()
  ctx.fillStyle = '#e27e76'; ctx.fillRect(-2, -11, 4, 22)
  ctx.restore()
}

function drawPowerup(ctx, item, elapsed) {
  const y = item.y + Math.sin(elapsed * 4 + item.phase) * 4
  const color = item.type === 'shield' ? '#efc878' : '#91c6c5'
  ctx.save(); ctx.translate(item.x, y)
  ctx.fillStyle = '#211d2b55'; ctx.beginPath(); ctx.ellipse(0, 19, 17, 4, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#292431'; ctx.strokeStyle = color; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color
  if (item.type === 'shield') {
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(8, -6); ctx.lineTo(7, 2); ctx.quadraticCurveTo(5, 8, 0, 10); ctx.quadraticCurveTo(-5, 8, -7, 2); ctx.lineTo(-8, -6); ctx.closePath(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-.5, 3); ctx.lineTo(4, -3); ctx.stroke()
  } else {
    ctx.beginPath(); ctx.moveTo(-7, -7); ctx.lineTo(-7, 1); ctx.quadraticCurveTo(-7, 8, 0, 8); ctx.quadraticCurveTo(7, 8, 7, 1); ctx.lineTo(7, -7); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-10, -7); ctx.lineTo(-4, -7); ctx.moveTo(4, -7); ctx.lineTo(10, -7); ctx.stroke()
  }
  ctx.restore()
}

function drawPowerupAura(ctx, x, groundY, jumpY, game) {
  const cx = x + 31, cy = groundY - 27 - jumpY
  ctx.save()
  if (game.magnetTimer > 0) {
    ctx.globalAlpha = .28 + Math.sin(game.elapsed * 7) * .08
    ctx.strokeStyle = '#91c6c5'; ctx.lineWidth = 2; ctx.setLineDash([5, 7])
    ctx.beginPath(); ctx.arc(cx, cy, 61, game.elapsed, game.elapsed + Math.PI * 1.75); ctx.stroke()
  }
  if (game.shieldTimer > 0) {
    ctx.globalAlpha = .58 + Math.sin(game.elapsed * 9) * .13
    ctx.strokeStyle = '#efc878'; ctx.lineWidth = 2.5; ctx.setLineDash([])
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.restore()
}

function drawResurrection(ctx, width, groundY, playerX, game) {
  const progress = Math.max(0, Math.min(1, 1 - game.resurrectionTimer / 1.8))
  const cx = playerX + 31, targetY = groundY - 74
  ctx.save()
  const fall = Math.min(1, progress / .68), ease = 1 - Math.pow(1 - fall, 3)
  const angelY = -48 + (targetY + 48) * ease
  const landing = Math.max(0, Math.min(1, (progress - .62) / .2))
  const glow = ctx.createRadialGradient(cx, targetY + 15, 3, cx, targetY + 15, 108)
  glow.addColorStop(0, `rgba(255, 235, 177, ${.48 * landing})`); glow.addColorStop(1, 'rgba(255, 235, 177, 0)')
  ctx.fillStyle = glow; ctx.fillRect(cx - 112, targetY - 92, 224, 130)

  // The angel drops in from above, flares its wings, and releases a pulse on landing.
  const flap = Math.sin(progress * 35) * 7
  const wing = (side) => {
    ctx.save(); ctx.translate(cx + side * 9, angelY + 2); ctx.scale(side, 1)
    ctx.fillStyle = '#fff7e7'; ctx.strokeStyle = '#d8c9ad'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(2, 4); ctx.quadraticCurveTo(-12, -13 - flap, -29, -10 - flap); ctx.quadraticCurveTo(-25, 3, -7, 14); ctx.closePath(); ctx.fill(); ctx.stroke()
    ctx.strokeStyle = '#e4d6bc'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(-4, 6); ctx.quadraticCurveTo(-17, 1 - flap * .3, -24, -7 - flap); ctx.moveTo(-5, 9); ctx.quadraticCurveTo(-17, 8, -22, 1); ctx.stroke()
    ctx.restore()
  }
  wing(-1); wing(1)
  ctx.fillStyle = '#fff1d8'; ctx.strokeStyle = '#695467'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.ellipse(cx, angelY - 7, 8, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#695467'; ctx.beginPath(); ctx.arc(cx - 2.5, angelY - 7, 1, 0, Math.PI * 2); ctx.arc(cx + 2.5, angelY - 7, 1, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f4ead8'; ctx.strokeStyle = '#695467'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(cx - 7, angelY + 1); ctx.lineTo(cx + 7, angelY + 1); ctx.lineTo(cx + 10, angelY + 20); ctx.quadraticCurveTo(cx, angelY + 25, cx - 10, angelY + 20); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.strokeStyle = '#efc878'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.ellipse(cx, angelY - 20, 10, 3.5, 0, 0, Math.PI * 2); ctx.stroke()

  if (landing > 0) {
    ctx.globalAlpha = 1 - landing
    ctx.strokeStyle = '#fff0bc'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.ellipse(cx, groundY - 25, 9 + landing * 64, 6 + landing * 17, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.globalAlpha = 1
  }
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff7df'; ctx.font = '700 11px Space Grotesk, sans-serif'; ctx.fillText(progress < .68 ? 'HELP IS ON THE WAY' : 'BACK IN THE RUN', width / 2, 54)
  ctx.restore()
}

const RUN_SCENES = [
  { name: 'HIGH STREET', kind: 'shops', sky: ['#332550', '#76526d', '#d88979'], buildings: ['#493b58', '#554258', '#43384f'], roof: '#70505f', windows: '#efbd83', awning: '#d77f78', road: ['#e9ab76', '#bd6e72', '#493249', '#28243b'] },
  { name: 'BEACH ROAD', kind: 'coast', sky: ['#293c55', '#657986', '#df9b7a'], buildings: ['#716254', '#5d645b', '#786a5b'], roof: '#957960', windows: '#f1d39a', awning: '#d98172', road: ['#e4b77b', '#c98271', '#534052', '#282b3d'] },
  { name: 'MARKET CIRCLE', kind: 'market', sky: ['#302644', '#755168', '#d58a74'], buildings: ['#584251', '#654956', '#493b4c'], roof: '#88604f', windows: '#f1c880', awning: '#df8b70', road: ['#e3a66f', '#bc7470', '#50364b', '#292438'] },
  { name: 'HARBOUR ROAD', kind: 'harbour', sky: ['#242c48', '#5d5269', '#ca857b'], buildings: ['#424452', '#4b4d59', '#3d414f'], roof: '#61606a', windows: '#ecc98c', awning: '#c87870', road: ['#dba477', '#ac6c70', '#403746', '#252735'] },
]

function drawScene(ctx, width, height, game, scene, alpha) {
  ctx.save()
  ctx.globalAlpha = alpha
  const groundY = height - 82
  const sky = ctx.createLinearGradient(0, 0, 0, groundY)
  sky.addColorStop(0, scene.sky[0]); sky.addColorStop(.62, scene.sky[1]); sky.addColorStop(1, scene.sky[2])
  ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height)
  const scroll = game.phase === 'playing' || game.phase === 'over' ? game.elapsed * game.speed : 0
  if (scene.kind === 'coast') {
    ctx.fillStyle = '#71858a'; ctx.fillRect(0, groundY - 112, width, 37)
    ctx.strokeStyle = '#f2d6a477'; ctx.lineWidth = 1
    for (let wave = 0; wave < 5; wave++) {
      const waveX = ((wave * 137 - scroll * .08) % (width + 100) + width + 100) % (width + 100)
      ctx.beginPath(); ctx.moveTo(waveX - 30, groundY - 102 + wave * 6); ctx.quadraticCurveTo(waveX, groundY - 106 + wave * 6, waveX + 30, groundY - 102 + wave * 6); ctx.stroke()
    }
  }
  const buildingGap = 154, cityScroll = scroll * .16 % buildingGap
  for (let i = -1; i < Math.ceil(width / buildingGap) + 2; i++) {
    const x = i * buildingGap - cityScroll, kind = (i + 9) % 3, bh = [82, 105, 72][kind]
    const heightOffset = scene.kind === 'coast' ? 34 : scene.kind === 'market' ? 8 : scene.kind === 'harbour' ? 24 : 0
    const top = groundY - bh + heightOffset
    ctx.fillStyle = scene.buildings[kind]
    ctx.fillRect(x, top, 124, groundY - top)
    ctx.fillStyle = scene.roof; ctx.fillRect(x - 4, top - 7, 132, 9)
    if (scene.kind === 'market') {
      ctx.fillStyle = scene.awning
      ctx.beginPath(); ctx.moveTo(x + 10, groundY - 39); ctx.lineTo(x + 113, groundY - 39); ctx.lineTo(x + 105, groundY - 25); ctx.lineTo(x + 18, groundY - 25); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#f2d0a1'
      for (let stripe = 0; stripe < 5; stripe++) ctx.fillRect(x + 17 + stripe * 19, groundY - 39, 4, 14)
    }
    if (scene.kind !== 'coast') {
      ctx.fillStyle = scene.windows
      for (let wx = x + 13; wx < x + 112; wx += 25) {
        ctx.fillRect(wx, top + 17, 12, 15)
        ctx.fillStyle = '#443849'; ctx.fillRect(wx - 2, top + 34, 16, 2); ctx.fillStyle = scene.windows
      }
    }
    if (scene.kind !== 'coast') {
      ctx.fillStyle = scene.awning
      ctx.fillRect(x + 19, groundY - 30, 84, 30)
      ctx.fillStyle = '#f4d1a0'; ctx.fillRect(x + 24, groundY - 25, 74, 2)
      ctx.fillStyle = '#51384b'; ctx.fillRect(x + 56, groundY - 17, 11, 17)
    }
  }
  if (scene.kind === 'coast') {
    ctx.fillStyle = '#bda080'; ctx.fillRect(0, groundY - 45, width, 5)
    ctx.fillStyle = '#8e796c'; ctx.fillRect(0, groundY - 40, width, 4)
    // A few palms break the roofline as the run follows the shoreline.
    for (let palm = 0; palm < 3; palm++) {
      const px = ((palm * 240 + 90 - scroll * .12) % (width + 180) + width + 180) % (width + 180) - 50
      ctx.strokeStyle = '#4b584d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, groundY - 43); ctx.quadraticCurveTo(px + 4, groundY - 94, px + 17, groundY - 111); ctx.stroke()
      ctx.strokeStyle = '#4b584d'; ctx.lineWidth = 3
      for (let frond = 0; frond < 5; frond++) {
        const angle = Math.PI * .15 + frond * Math.PI * .34, tx = px + 17 + Math.cos(angle) * 24, ty = groundY - 111 + Math.sin(angle) * 18
        ctx.beginPath(); ctx.moveTo(px + 17, groundY - 111); ctx.quadraticCurveTo(px + 17 + Math.cos(angle) * 11, groundY - 111 + Math.sin(angle) * 8, tx, ty); ctx.stroke()
      }
    }
  }
  if (scene.kind === 'harbour') {
    const craneX = width * .72 - (scroll * .06 % (width * .6))
    ctx.strokeStyle = '#4b4a59'; ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(craneX, groundY - 88); ctx.lineTo(craneX, groundY - 164); ctx.lineTo(craneX + 90, groundY - 164); ctx.lineTo(craneX + 112, groundY - 145); ctx.moveTo(craneX + 70, groundY - 162); ctx.lineTo(craneX + 70, groundY - 115); ctx.stroke()
  }
  if (scene.kind === 'shops' || scene.kind === 'market') {
    // A strand of bunting marks the birthday route without covering the skyline.
    const buntingOffset = scroll * .08 % 58
    ctx.strokeStyle = '#e9c88b'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, groundY - 135); ctx.quadraticCurveTo(width / 2, groundY - 116, width, groundY - 135); ctx.stroke()
    for (let x = -58 - buntingOffset; x < width + 58; x += 58) {
      const y = groundY - 128 + Math.sin((x + buntingOffset) / width * Math.PI) * 15
      ctx.fillStyle = scene.kind === 'market' ? '#efc878' : '#e78278'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 13, y + 1); ctx.lineTo(x + 6, y + 12); ctx.closePath(); ctx.fill()
    }
  }
  const track = ctx.createLinearGradient(0, groundY, 0, height)
  track.addColorStop(0, scene.road[0]); track.addColorStop(.1, scene.road[1]); track.addColorStop(.11, scene.road[2]); track.addColorStop(1, scene.road[3])
  ctx.fillStyle = track; ctx.fillRect(0, groundY, width, height - groundY)
  ctx.fillStyle = '#f1cd86'; ctx.fillRect(0, groundY, width, 3)
  const dashOffset = scroll % 82
  for (let x = -82 - dashOffset; x < width; x += 82) {
    ctx.fillStyle = '#d9a56e'; roundedRect(ctx, x, groundY + 45, 42, 4, 2); ctx.fill()
  }
  ctx.fillStyle = '#f0d8bb'; ctx.font = '700 10px Space Grotesk, sans-serif'; ctx.textAlign = 'right'; ctx.fillText(`TAKORADI · ${scene.name}`, width - 18, groundY + 27)
  ctx.restore()
}

function drawWorld(ctx, width, height, game) {
  const sceneDuration = 20
  const transitionDuration = 2.5
  const sceneStep = Math.floor(game.elapsed / sceneDuration)
  const sceneIndex = sceneStep % RUN_SCENES.length
  const sceneTime = game.elapsed % sceneDuration
  ctx.clearRect(0, 0, width, height)
  if (sceneStep > 0 && sceneTime < transitionDuration) {
    const rawProgress = sceneTime / transitionDuration
    const blend = rawProgress * rawProgress * (3 - 2 * rawProgress)
    const previous = RUN_SCENES[(sceneIndex - 1 + RUN_SCENES.length) % RUN_SCENES.length]
    drawScene(ctx, width, height, game, previous, 1 - blend)
    drawScene(ctx, width, height, game, RUN_SCENES[sceneIndex], blend)
  } else {
    drawScene(ctx, width, height, game, RUN_SCENES[sceneIndex], 1)
  }
  return height - 82
}

function CanvasGame({ onFinish, onAbort, claimedAmount, character = 'slime' }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(createGame())
  const finishRef = useRef(false)
  const [phase, setPhase] = useState('intro')
  const [hud, setHud] = useState({ gifts: 0, points: 0, speed: 310, lives: 3, shield: false, magnet: 0 })
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('ella-sound') !== 'off')
  const hapticsSupported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
  const [hapticsEnabled, setHapticsEnabled] = useState(() => hapticsSupported && localStorage.getItem('ella-haptics') !== 'off')
  const audioRef = useRef(null)
  const soundEnabledRef = useRef(soundEnabled)
  const hapticsEnabledRef = useRef(hapticsEnabled)
  const jumpRef = useRef(() => {})
  const endRef = useRef(() => {})
  const abortRef = useRef(() => {})
  const runnerName = CHARACTERS.find((runner) => runner.id === character)?.name || 'Bloop'
  const getAudio = () => {
    if (!audioRef.current) audioRef.current = createArcadeAudio()
    return audioRef.current
  }
  const playSound = (name) => {
    if (!soundEnabledRef.current) return
    const audio = getAudio()
    if (audio) { audio.resume().catch(() => {}); audio.play(name) }
  }
  const pulse = (pattern) => {
    if (hapticsEnabledRef.current && typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(pattern)
  }

  useEffect(() => {
    soundEnabledRef.current = soundEnabled
    if (soundEnabled && (phase === 'playing' || phase === 'resurrect')) getAudio()?.startMusic()
    else audioRef.current?.stopMusic()
  }, [soundEnabled, phase])
  useEffect(() => { hapticsEnabledRef.current = hapticsEnabled }, [hapticsEnabled])
  useEffect(() => () => audioRef.current?.dispose(), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let width = 0, height = 0, raf, last = 0, hudTimer = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width; height = rect.height
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize()
    const frame = (now) => {
      const dt = Math.min((now - (last || now)) / 1000, .04); last = now
      const game = gameRef.current
      if (game.phase === 'countdown') {
        game.countIn -= dt
        if (game.countIn <= 0) { game.phase = 'playing'; setPhase('playing') }
      } else if (game.phase === 'resurrect') {
        game.resurrectionTimer -= dt
        if (game.resurrectionTimer <= 0) { playSound('revive'); pulse([14, 22, 14]); game.phase = 'playing'; game.resurrectionTimer = 0; setPhase('playing') }
      } else if (game.phase === 'playing') {
        game.elapsed += dt
        game.speed = 310 + Math.min(game.elapsed * 7, 300)
        game.shieldTimer = Math.max(0, game.shieldTimer - dt)
        game.magnetTimer = Math.max(0, game.magnetTimer - dt)
        game.powerupMessageTimer = Math.max(0, game.powerupMessageTimer - dt)
        game.groundOffset += game.speed * dt
        if (!game.grounded) {
          game.playerY += game.playerVY * dt
          game.playerVY -= 1750 * dt
          if (game.playerY <= 0) { game.playerY = 0; game.playerVY = 0; game.grounded = true }
        }
        game.obstacleTimer -= dt
        if (game.obstacleTimer <= 0) {
          const types = [{ type: 'cupcake', w: 47, h: 55 }, { type: 'cake', w: 52, h: 68 }, { type: 'lollipop', w: 38, h: 63 }]
          const hazard = types[Math.floor(Math.random() * types.length)]
          game.obstacles.push({ ...hazard, x: width + 36 })
          game.obstacleTimer = 1.18 + Math.random() * .62 + Math.min(game.speed / 1600, .2)
        }
        game.giftTimer -= dt
        if (game.giftTimer <= 0) {
          game.gifts.push({ x: width + 40, y: height - 82 - (91 + Math.random() * 42), phase: Math.random() * 6 })
          game.giftTimer = 1.65 + Math.random() * 1.1
        }
        game.powerupTimer -= dt
        if (game.powerupTimer <= 0) {
          const pickupX = width + 42
          const hasHazardAtPickup = game.obstacles.some((hazard) => pickupX + 20 > hazard.x - 12 && pickupX - 20 < hazard.x + hazard.w + 12)
          if (hasHazardAtPickup) {
            // Wait for a clear gap instead of placing the pickup inside an obstacle.
            game.powerupTimer = .35
          } else {
            game.powerups.push({ type: Math.random() < .5 ? 'shield' : 'magnet', x: pickupX, y: height - 82 - 44, phase: Math.random() * 6 })
            // Keep the next obstacle from appearing on top of this pickup.
            game.obstacleTimer = Math.max(game.obstacleTimer, 1.25)
            game.powerupTimer = 14 + Math.random() * 4
          }
        }
        game.obstacles.forEach((item) => { item.x -= game.speed * dt })
        game.gifts.forEach((item) => {
          item.x -= game.speed * dt
          if (game.magnetTimer > 0) {
            const targetX = Math.max(52, width * .17) + 31, targetY = height - 82 - 27 - game.playerY
            const dx = targetX - item.x, dy = targetY - item.y
            if (Math.hypot(dx, dy) < 190) {
              const pull = Math.min(1, dt * 4.2)
              item.x += dx * pull; item.y += dy * pull
            }
          }
        })
        game.powerups.forEach((item) => { item.x -= game.speed * dt })
        game.obstacles = game.obstacles.filter((item) => item.x + item.w > -20)
        game.gifts = game.gifts.filter((item) => item.x > -30)
        game.powerups = game.powerups.filter((item) => item.x > -30)

        const playerX = Math.max(52, width * .17), groundY = height - 82
        for (const item of game.obstacles) {
          const px = playerX + 9, pw = 43, py = groundY - 49 - game.playerY + 7, ph = 43
          const ox = item.x + 7, ow = item.w - 14, oy = groundY - item.h + 7, oh = item.h - 8
          if (game.elapsed >= game.invulnerableUntil && px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
            if (game.shieldTimer > 0) {
              playSound('shield'); pulse(14)
              game.shieldTimer = 0
              game.invulnerableUntil = game.elapsed + 1.25
              game.powerupMessage = 'Shield absorbed the hit'
              game.powerupMessageTimer = 1.8
              game.obstacles = game.obstacles.filter((hazard) => hazard !== item)
              for (let i = 0; i < 14; i++) game.particles.push({ x: playerX + 30, y: groundY - 29 - game.playerY, vx: (Math.random() - .5) * 210, vy: (Math.random() - .5) * 210, life: .35 + Math.random() * .35, color: i % 2 ? '#efc878' : '#fff0c7' })
              setHud({ gifts: game.giftsCount, points: game.giftsCount * 100, speed: game.speed, lives: game.lives, shield: false, magnet: game.magnetTimer })
              break
            }
            playSound('hit'); pulse([24, 30, 24])
            game.lives -= 1
            setHud({ gifts: game.giftsCount, points: game.giftsCount * 100, speed: game.speed, lives: game.lives, shield: false, magnet: game.magnetTimer })
            game.playerY = 0; game.playerVY = 0; game.grounded = true
            game.obstacles = game.obstacles.filter((hazard) => hazard.x > playerX + 250)
            if (game.lives > 0) {
              game.phase = 'resurrect'; game.resurrectionTimer = 1.8
              game.invulnerableUntil = game.elapsed + 4
              game.obstacleTimer = 2.6
              setPhase('resurrect')
            } else {
              playSound('over')
              game.phase = 'over'; game.overAt = now; setPhase('over')
            }
            break
          }
        }
        if (game.phase === 'playing') {
          game.powerups = game.powerups.filter((item) => {
            const pickupX = item.x - 15, pickupY = item.y - 15, pickupSize = 30
            const playerLeft = playerX + 9, playerTop = groundY - 51 - game.playerY, playerWidth = 46, playerHeight = 51
            if (pickupX > playerLeft + playerWidth || pickupX + pickupSize < playerLeft || pickupY > playerTop + playerHeight || pickupY + pickupSize < playerTop) return true
            if (item.type === 'shield') {
              playSound('shield'); pulse(18)
              game.shieldTimer = 12
              game.powerupMessage = 'Shield ready · blocks one hit'
            } else {
              playSound('magnet'); pulse(12)
              game.magnetTimer = 7
              game.powerupMessage = 'Parcel magnet · 7 seconds'
            }
            game.powerupMessageTimer = 1.8
            for (let i = 0; i < 9; i++) game.particles.push({ x: item.x, y: item.y, vx: (Math.random() - .5) * 130, vy: -Math.random() * 145, life: .45 + Math.random() * .25, color: item.type === 'shield' ? '#efc878' : '#91c6c5' })
            return false
          })
          game.gifts = game.gifts.filter((item) => {
            const px = playerX + 4, py = groundY - 51 - game.playerY
            if (item.x > px + 65 || item.x + 24 < px || item.y > py + 59 || item.y + 22 < py) return true
            game.giftsCount += 1
            playSound('parcel'); pulse(10)
            for (let i = 0; i < 11; i++) game.particles.push({ x: item.x + 12, y: item.y + 5, vx: (Math.random() - .5) * 170, vy: -Math.random() * 155, life: .5 + Math.random() * .3, color: ['#ffe37b', '#ff91b3', '#a6ff83'][i % 3] })
            return false
          })
        }
        game.particles.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; p.life -= dt })
        game.particles = game.particles.filter((p) => p.life > 0)
        hudTimer += dt
        if (hudTimer > .12) { hudTimer = 0; setHud({ gifts: game.giftsCount, points: game.giftsCount * 100, speed: game.speed, lives: game.lives, shield: game.shieldTimer > 0, magnet: game.magnetTimer }) }
      }

      const groundY = drawWorld(ctx, width, height, game)
      game.gifts.forEach((gift) => drawGift(ctx, gift, game.elapsed))
      game.obstacles.forEach((item) => drawObstacle(ctx, item, groundY, game.elapsed))
      game.powerups.forEach((item) => drawPowerup(ctx, item, game.elapsed))
      game.particles.forEach((p) => { ctx.globalAlpha = Math.max(0, p.life * 1.6); ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1 })
      const playerX = Math.max(52, width * .17)
      let playerAlpha = game.elapsed < game.invulnerableUntil && Math.floor(game.elapsed * 12) % 2 === 0 ? .4 : 1
      if (game.phase === 'resurrect') {
        const reviveProgress = 1 - game.resurrectionTimer / 1.8
        playerAlpha *= Math.max(0, Math.min(1, (reviveProgress - .58) / .18))
      }
      ctx.globalAlpha = playerAlpha
      drawPowerupAura(ctx, playerX, groundY, game.playerY, game)
      drawCharacter(ctx, character, playerX, groundY, game.playerY, game.elapsed, game.phase, game.playerVY)
      ctx.globalAlpha = 1
      if (game.phase === 'resurrect') drawResurrection(ctx, width, groundY, playerX, game)
      if (game.powerupMessageTimer > 0 && game.phase === 'playing') {
        const fade = Math.min(1, game.powerupMessageTimer * 2)
        ctx.save(); ctx.globalAlpha = fade; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.font = '700 11px Space Grotesk, sans-serif'
        const textWidth = ctx.measureText(game.powerupMessage).width + 28
        roundedRect(ctx, (width - textWidth) / 2, 82, textWidth, 30, 8)
        ctx.fillStyle = '#292431e8'; ctx.fill(); ctx.strokeStyle = '#f4ead84a'; ctx.lineWidth = 1; ctx.stroke()
        ctx.fillStyle = '#f4ead8'; ctx.fillText(game.powerupMessage, width / 2, 97)
        ctx.restore()
      }
      if (game.phase === 'countdown') {
        const number = Math.max(1, Math.ceil(game.countIn))
        ctx.fillStyle = '#1d103dcc'; ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#fff0a5'; ctx.font = `700 ${Math.min(90, height * .23)}px Space Grotesk, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(number, width / 2, height / 2)
        ctx.font = '700 12px Space Grotesk, sans-serif'; ctx.fillStyle = '#fff2e4'; ctx.fillText('GET READY TO RUN!', width / 2, height / 2 + 62)
      }
      if (game.phase === 'over') {
        ctx.fillStyle = '#21123dcc'; ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#f2d18d'; ctx.font = '700 28px Space Grotesk, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('RUN OVER', width / 2, height / 2 - 10)
        ctx.fillStyle = '#fff4e9'; ctx.font = '600 13px DM Sans, sans-serif'; ctx.fillText(`${game.giftsCount} gifts collected`, width / 2, height / 2 + 24)
        if (!finishRef.current && now - game.overAt > 850) endRef.current()
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])

  jumpRef.current = () => {
    const game = gameRef.current
    if (game.phase === 'playing' && game.grounded) { playSound('jump'); game.grounded = false; game.playerVY = 670 }
  }
  endRef.current = () => {
    if (finishRef.current) return
    finishRef.current = true
    const game = gameRef.current
    onFinish({ gifts: game.giftsCount, score: game.giftsCount * 100, seconds: game.elapsed })
  }
  abortRef.current = () => {
    if (finishRef.current) return
    finishRef.current = true
    onAbort()
  }
  useEffect(() => {
    const keyDown = (event) => {
      if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW') { event.preventDefault(); jumpRef.current() }
      if (event.code === 'Escape') abortRef.current()
    }
    window.addEventListener('keydown', keyDown)
    return () => window.removeEventListener('keydown', keyDown)
  }, [])

  const beginRun = () => { if (soundEnabled) getAudio()?.resume().catch(() => {}); gameRef.current.phase = 'countdown'; gameRef.current.countIn = 3; setPhase('countdown') }
  const jump = (event) => { event?.stopPropagation(); jumpRef.current() }
  const finish = () => abortRef.current()
  const toggleSound = () => {
    const next = !soundEnabled
    localStorage.setItem('ella-sound', next ? 'on' : 'off')
    setSoundEnabled(next)
    if (next) getAudio()?.resume().catch(() => {})
  }
  const toggleHaptics = () => {
    if (!hapticsSupported) return
    const next = !hapticsEnabled
    localStorage.setItem('ella-haptics', next ? 'on' : 'off')
    setHapticsEnabled(next)
  }
  return <div className="game-overlay dino-game">
    <div className="game-topline"><button className="game-exit" onClick={finish} aria-label="End run"><X size={19}/></button><div className="game-title">ELLA'S BIRTHDAY DASH</div><div className="dino-hud"><div className="dino-lives" aria-label={`${hud.lives} lives remaining`}>{[0, 1, 2].map((life) => <span key={life} className={life < hud.lives ? 'life-full' : 'life-lost'}>♥</span>)}</div><div className="powerup-status">{hud.shield && <span className="powerup-chip shield-chip" title="Shield: blocks one hit"><Shield size={13}/> SHIELD</span>}{hud.magnet > 0 && <span className="powerup-chip magnet-chip" title={`Magnet: ${Math.ceil(hud.magnet)} seconds remaining`}><Magnet size={13}/> {Math.ceil(hud.magnet)}s</span>}</div><div className="dino-score"><span className="gift-counter"><Gift size={14}/> {hud.gifts}</span><b>{hud.points.toLocaleString()} pts</b></div>{claimedAmount != null && <b className="claimed-chip">CLAIMED {fmtMoney(claimedAmount)}</b>}</div></div>
    <div className="dino-world"><canvas ref={canvasRef} className="dino-canvas" onPointerDown={jump} aria-label="Birthday runner game. Tap to jump over obstacles and collect floating gifts." />
      {phase === 'intro' && <div className="dino-intro"><span className="dino-badge">TAKORADI · GHANA</span><h2>{runnerName} is ready.</h2><p>Three lives. Jump over cupcakes, cake stacks, and lollipops. Collect parcels and look out for shield and magnet pickups.</p><div className="dino-tip"><span className="keycap">SPACE</span><span className="keycap">↑</span><span>jump</span><i>·</i><span>tap anywhere to jump</span></div><div className="pickup-legend"><span><Shield size={14}/> Blocks one hit</span><span><Magnet size={14}/> Pulls in parcels</span></div><button className="primary-btn dino-start" onClick={beginRun}><span>START RUN</span><ArrowUp size={17}/></button></div>}
      {phase === 'playing' && <div className="dino-speed"><span>RUN SPEED</span><i><b style={{ width: `${Math.min(100, ((hud.speed - 310) / 300) * 100)}%` }}/></i><strong>{Math.round(hud.speed)} km/h</strong></div>}
    </div>
    <div className={`dino-controls ${phase !== 'playing' ? 'dino-controls-idle' : ''}`}><span>{phase === 'playing' ? 'JUMP · COLLECT' : "ELLA'S BIRTHDAY DASH"}</span><div className="sensory-toggles"><button className={`sensory-toggle ${soundEnabled ? 'is-on' : ''}`} onClick={toggleSound} aria-label={soundEnabled ? 'Mute game sounds' : 'Enable game sounds'} aria-pressed={soundEnabled} title={soundEnabled ? 'Sound on' : 'Sound off'}>{soundEnabled ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button><button className={`sensory-toggle ${hapticsEnabled ? 'is-on' : ''}`} onClick={toggleHaptics} disabled={!hapticsSupported} aria-label={hapticsSupported ? (hapticsEnabled ? 'Turn haptics off' : 'Turn haptics on') : 'Haptics are not supported on this device'} aria-pressed={hapticsEnabled} title={hapticsSupported ? (hapticsEnabled ? 'Haptics on' : 'Haptics off') : 'Haptics not supported'}><Vibrate size={16}/></button></div>{phase === 'playing' && <button onPointerDown={jump} className="jump-button"><ArrowUp size={22}/><small>JUMP</small></button>}</div>
  </div>
}

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [balance, setBalance] = useState({ points: 0, cashedOut: false })
  const [modal, setModal] = useState('')
  const [toast, setToast] = useState('')
  const [gameActive, setGameActive] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(() => { const saved = localStorage.getItem('ella-character'); return CHARACTERS.some((runner) => runner.id === saved) ? saved : 'slime' })
  const [claim, setClaim] = useState({ name: '', mobile: '', rating: '10' })
  const [busy, setBusy] = useState(false)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [cashoutQuote, setCashoutQuote] = useState(null)
  const [previewEarned, setPreviewEarned] = useState(0)
  const [savingRun, setSavingRun] = useState(false)
  const [lastRun, setLastRun] = useState({ score: 0, gifts: 0, seconds: 0 })
  const refresh = useCallback(async () => {
    try {
      const requests = DEV_PREVIEW ? [fetch(`${API}/config`)] : [fetch(`${API}/config`), fetch(`${API}/account`)]
      const responses = await Promise.all(requests)
      const config = await responses[0].json()
      setUnlocked(config.unlocked || DEV_PREVIEW)
      setCountdown(DEV_PREVIEW ? 0 : config.remainingMs)
      if (!DEV_PREVIEW) setBalance(await responses[1].json())
    } catch {
      const left = new Date(TARGET).getTime() - Date.now()
      setUnlocked(DEV_PREVIEW || left <= 0); setCountdown(DEV_PREVIEW ? 0 : Math.max(0, left))
      const cached = JSON.parse(localStorage.getItem('ella-balance') || '{}')
      setBalance({ points: cached.points || 0, cashedOut: cached.cashedOut || false, claimedAmount: cached.claimedAmount || null })
    }
  }, [])
  useEffect(() => { refresh(); const t = setInterval(refresh, 15000); return () => clearInterval(t) }, [refresh])
  useEffect(() => {
    if (unlocked && (DEV_PREVIEW || !localStorage.getItem('ella-welcomed'))) {
      setModal('welcome')
      if (!DEV_PREVIEW) localStorage.setItem('ella-welcomed', 'yes')
    }
  }, [unlocked])
  useEffect(() => {
    if (countdown === null || unlocked) return
    const t = setInterval(() => {
      const left = new Date(TARGET).getTime() - Date.now()
      setCountdown(Math.max(left, 0))
      if (left <= 0) { setUnlocked(true); refresh() }
    }, 1000)
    return () => clearInterval(t)
  }, [countdown, unlocked, refresh])

  const finishRun = useCallback(async (finalRun) => {
    setGameActive(false)
    setLastRun({ score: finalRun.score, gifts: finalRun.gifts, seconds: finalRun.seconds || 0 })
    setModal('round')
    if (DEV_PREVIEW) {
      setBalance((current) => ({ ...current, points: Math.min(9000, current.points + finalRun.score), totalRuns: (current.totalRuns || 0) + 1 }))
      const gameReward = Math.min(500, 50 + 2 * Math.floor(finalRun.seconds || 0) + 5 * finalRun.gifts)
      setPreviewEarned((current) => Math.min(500, current + gameReward))
      return
    }
    setSavingRun(true)
    try {
      const res = await fetch(`${API}/runs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ points: finalRun.score, gifts: finalRun.gifts, seconds: Math.min(120, Math.floor(finalRun.seconds || 0)) }) })
      if (!res.ok) throw new Error()
      const updated = await res.json(); setBalance(updated); localStorage.setItem('ella-balance', JSON.stringify(updated))
    } catch { setToast('Could not save this run. Check the server and MongoDB connection.'); setTimeout(() => setToast(''), 3500) }
    finally { setSavingRun(false) }
  }, [])
  const startRun = () => { setModal(''); setGameActive(true) }
  const chooseCharacter = (id) => { setSelectedCharacter(id); localStorage.setItem('ella-character', id) }

  const openCashout = async () => {
    if (balance.cashedOut) return
    setModal('cashout'); setCashoutQuote(null)
    if (DEV_PREVIEW) { setCashoutQuote(Math.max(50, previewEarned)); return }
    setQuoteLoading(true)
    try {
      const response = await fetch(`${API}/cashout/quote`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load the birthday gift yet.')
      setCashoutQuote(data.amount)
    } catch (error) { setModal(''); setToast(error.message); setTimeout(() => setToast(''), 3500) }
    finally { setQuoteLoading(false) }
  }

  const cashout = async (e) => {
    e.preventDefault(); setBusy(true)
    if (DEV_PREVIEW) {
      setBalance((current) => ({ ...current, cashedOut: true, claimedAmount: cashoutQuote || 50 }))
      setModal('celebrate'); setBusy(false); return
    }
    try {
      const res = await fetch(`${API}/cashout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(claim) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not submit just yet.')
      setBalance(data.account); localStorage.setItem('ella-balance', JSON.stringify(data.account)); setModal('celebrate')
    } catch (err) { setToast(err.message); setTimeout(() => setToast(''), 3500) }
    finally { setBusy(false) }
  }

  const timeParts = countdown === null ? null : { days: Math.floor(countdown / 86400000), hours: Math.floor(countdown / 3600000) % 24, mins: Math.floor(countdown / 60000) % 60, secs: Math.floor(countdown / 1000) % 60 }
  const points = balance.points || 0

  return <main className="app-shell">
    <div className="grain" />
    <header className="topbar"><a className="brand" href="#top"><span className="brand-icon"><Flag size={17} /></span><span>ELLA<span className="brand-soft"> / BIRTHDAY DASH</span></span></a><div className="topbar-right"><span className="for-ella">OCTOBER 27 · TAKORADI</span></div></header>
    {!unlocked ? <section className="countdown-screen" id="top"><div className="countdown-copy"><span className="eyebrow"><Clock3 size={14} /> THE START LINE OPENS SOON</span><h1>Ella's<br /><span>birthday dash.</span></h1><p>Her route through Takoradi is almost ready.<br />The start line opens at noon on October 27.</p><div className="clock-grid">{timeParts && Object.entries(timeParts).map(([unit, val]) => <div className="clock-card" key={unit}><strong>{String(val).padStart(2, '0')}</strong><span>{unit}</span></div>)}</div><div className="unlock-note"><Clock3 size={15} /> Opens October 27 at 12:00 PM · Ghana time</div><button className="preview-link" onClick={() => { const url = new URL(window.location.href); url.searchParams.set('preview', '1'); window.location.href = url.toString() }}>Developer preview <ChevronRight size={14}/></button><div className="countdown-cake" aria-hidden="true"><SlimePortrait/></div></div><div className="countdown-footer">A small birthday surprise, made by hand.</div></section> : <>
      {DEV_PREVIEW && <div className="preview-banner">DEVELOPER PREVIEW · scores and claims are simulated <button onClick={() => { const url = new URL(window.location.href); url.searchParams.delete('preview'); window.location.href = url.toString() }}>Exit preview</button></div>}
      <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow"><MapPin size={14} /> MADE FOR ELLA · OCT 27</span><h1>Ella's<br /><span>birthday dash.</span></h1><p>A little run through the streets of Takoradi.<br />Mind the cakes. Bring home the parcels.</p><button className="primary-btn" onClick={startRun}><span>START A RUN</span><ChevronRight size={18} /></button><div className="control-hint"><span>SPACE</span> or <span>↑</span> jump <i>·</i> tap to jump on mobile</div></div><div className="hero-art"><div className="hero-disc"/><div className="portrait-frame"><CharacterPortrait characterId={selectedCharacter} /></div><span className="float-item fi-a"><Gift size={23}/></span><span className="float-item fi-b"><Cherry size={22}/></span><span className="float-item fi-c"><Heart size={18}/></span><span className="float-item fi-d"><CakeSlice size={23}/></span><div className="hero-label">TAKORADI<br />OCTOBER 27</div></div></section>
      <section className="dashboard"><div className="dashboard-head"><div><span className="eyebrow small">ELLA'S BIRTHDAY DASH</span><h2>Your run so far</h2></div><div className="level-chip"><Star size={14} /> LEVEL 01</div></div><div className="character-picker"><div className="character-picker-head"><span className="eyebrow small">CHOOSE YOUR RUNNER</span><small>Same run. Different character.</small></div><div className="character-options">{CHARACTERS.map((runner) => <button key={runner.id} className={`character-option ${selectedCharacter === runner.id ? 'is-selected' : ''}`} aria-pressed={selectedCharacter === runner.id} onClick={() => chooseCharacter(runner.id)}><span className="character-option-art"><CharacterPortrait characterId={runner.id} /></span><span className="character-option-copy"><strong>{runner.name}</strong><small>{runner.detail}</small></span>{selectedCharacter === runner.id && <Check size={15} />}</button>)}</div></div><div className="stat-grid"><div className="stat-card score-card"><div className="stat-icon pink"><Star size={18} /></div><div><span>YOUR POINTS</span><strong>{points.toLocaleString()}</strong><small>Collected on your runs</small></div><div className="score-spark">✦</div></div><div className="stat-card prize-card surprise-card"><div className="stat-icon gold"><Trophy size={18} /></div><div><span>{balance.cashedOut ? 'YOUR BIRTHDAY GIFT' : 'BIRTHDAY GIFT'}</span><strong>{balance.cashedOut ? fmtMoney(balance.claimedAmount) : '???'}</strong><small>{balance.cashedOut ? 'Claimed · thank you for playing' : 'Tap cash out when you’re ready'}</small></div>{!balance.cashedOut && <div className="surprise-mark">✦</div>}</div></div><div className="game-panel"><div className="game-panel-icon"><Flag size={19} /></div><div className="game-panel-copy"><strong>Ella's Birthday Dash</strong><span>Three lives per run. Jump the cake stands and collect parcels.</span></div><button className="outline-btn" onClick={startRun}>Play a round <ChevronRight size={16} /></button></div><div className="cashout-strip"><div className="cashout-copy"><div className="cashout-gift"><Gift size={19} /></div><div><strong>{balance.cashedOut ? 'Gift claimed' : 'Your birthday gift'}</strong><span>{balance.cashedOut ? 'Your claim is saved. Have a lovely birthday, Ella.' : 'Play a few runs, then cash out once when you’re ready.'}</span></div></div><button className="cashout-btn" disabled={balance.cashedOut} onClick={openCashout}>{balance.cashedOut ? <><Check size={16} /> Claimed</> : <>Cash out <ChevronRight size={16} /></>}</button></div><div className="love-note"><Heart size={13} /> A little birthday run, made just for Ella.</div></section>
    </>}

    {modal === 'welcome' && <div className="modal-backdrop welcome-backdrop" onClick={() => setModal('')}><div className="modal welcome-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="welcome-confetti" aria-hidden="true"><i/><i/><i/><SlimePortrait/></div><span className="eyebrow">OCTOBER 27 · MADE FOR YOU</span><h2>Happy Birthday,<br /><span>Ella.</span></h2><p>I made you a little game for your day. Take the long way through Takoradi, dodge the cakes, and see how many parcels you can bring back.</p><div className="welcome-signoff">Have the loveliest day <Heart size={15} /></div><button className="primary-btn modal-cta" onClick={() => setModal('')}><span>TAKE A LOOK</span><ChevronRight size={18}/></button></div></div>}
    {modal === 'round' && <div className="modal-backdrop" onClick={() => setModal('')}><div className="modal round-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="celebrate-burst"><ParcelIcon/></div><span className="eyebrow">RUN SUMMARY</span><h2>Nice run, <span>Ella.</span></h2><div className="round-stats"><div><strong>{lastRun.score}</strong><span>POINTS</span></div><div><strong>{lastRun.gifts}</strong><span>PARCELS</span></div><div><strong>{lastRun.seconds}s</strong><span>TIME</span></div></div><p>That’s all three lives. Take another run, or cash out your birthday gift when you’re ready.</p><button className="primary-btn modal-cta" onClick={startRun}><span>RUN AGAIN</span><ChevronRight size={18}/></button><button className="round-cashout" onClick={openCashout} disabled={savingRun || balance.cashedOut}>{savingRun ? 'Saving your run…' : balance.cashedOut ? 'Gift already claimed' : 'Cash out birthday gift'}</button></div></div>}
    {modal === 'cashout' && <div className="modal-backdrop" onClick={() => setModal('')}><form className="modal cashout-modal" onSubmit={cashout} onClick={(e) => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="cashout-modal-icon"><Gift size={23}/></div><span className="eyebrow">YOUR ONE-TIME BIRTHDAY CLAIM</span><h2>You won <span>{quoteLoading || cashoutQuote === null ? '…' : fmtMoney(cashoutQuote)}</span></h2><p>This is your birthday gift. Add your details below to claim it.</p><label>Your name<input required value={claim.name} onChange={(e) => setClaim({ ...claim, name: e.target.value })} placeholder="Name" maxLength="80" /></label><label>Mobile money number<input required value={claim.mobile} onChange={(e) => setClaim({ ...claim, mobile: e.target.value })} placeholder="e.g. 024 123 4567" inputMode="tel" maxLength="20" /></label><label>How much fun did you have? <span className="rating-line">{claim.rating}/10</span><input className="rating-range" type="range" min="1" max="10" value={claim.rating} onChange={(e) => setClaim({ ...claim, rating: e.target.value })}/></label><button className="primary-btn submit-btn" type="submit" disabled={busy || quoteLoading || cashoutQuote === null}><span>{busy ? 'SENDING…' : 'CLAIM MY BIRTHDAY MONEY'}</span><ChevronRight size={18}/></button><small className="privacy-note">Your details are only used to send your birthday gift.</small></form></div>}
    {modal === 'celebrate' && <div className="modal-backdrop" onClick={() => setModal('')}><div className="modal celebrate-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="celebrate-burst"><Check size={35}/></div><span className="eyebrow">CLAIM SAVED</span><h2>It's yours,<br /><span>Ella.</span></h2><p>Your birthday gift is <strong className="claimed-reveal">{fmtMoney(balance.claimedAmount)}</strong>. I hope it makes the day a little sweeter.</p><button className="primary-btn modal-cta" onClick={() => setModal('')}><span>BACK TO THE DASH</span><ChevronRight size={18}/></button></div></div>}
    {gameActive && <CanvasGame onFinish={finishRun} onAbort={() => setGameActive(false)} claimedAmount={balance.cashedOut ? balance.claimedAmount : null} character={selectedCharacter} />}
    {toast && <div className="toast">{toast}</div>}
    <footer className="site-footer">Made for Ella · October 27</footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
