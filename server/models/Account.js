import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  _id: { type: String, default: 'ella' },
  points: { type: Number, default: 0, min: 0, max: 9000 },
  earned: { type: Number, default: 0, min: 0, max: 500 },
  totalRuns: { type: Number, default: 0 },
  cashedOut: { type: Boolean, default: false },
  cashout: {
    name: String,
    mobile: String,
    rating: Number,
    amount: Number,
    submittedAt: Date,
  },
}, { timestamps: true })

export default mongoose.model('Account', accountSchema)
