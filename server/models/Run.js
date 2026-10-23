import mongoose from 'mongoose'

const runSchema = new mongoose.Schema({
  points: { type: Number, required: true },
  gifts: { type: Number, required: true },
  survivalSeconds: { type: Number, required: true },
  roundReward: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('Run', runSchema)
