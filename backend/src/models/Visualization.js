import mongoose from 'mongoose'

const visualizationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  algorithmId: {
    type: String,
    required: true,
  },
  algorithmName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['sorting', 'graph', 'tree', 'search', 'dynamic'],
    required: true,
  },
  inputData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  steps: [{
    action: String,
    indices: [Number],
    values: [mongoose.Schema.Types.Mixed],
    explanation: String,
  }],
  executionTime: {
    type: Number,
    default: 0,
  },
  spaceComplexity: {
    type: String,
    default: 'O(n)',
  },
  timeComplexity: {
    type: String,
    default: 'O(n)',
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Visualization', visualizationSchema)
