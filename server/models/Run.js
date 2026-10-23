import mongoose from 'mongoose'

const runSchema = new mongoose.Schema({
  accountId: { type: String, required: true, index: true },
  preview: { type: Boolean, default: false, index: true },
  points: { type: Number, required: true },
  gifts: { type: Number, required: true },
  survivalSeconds: { type: Number, required: true },
  roundReward: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('Run', runSchema)
