import express from 'express'
import User from '../models/User.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get user profile
router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Update user profile
router.put('/profile', authenticateToken, async (req, res, next) => {
  try {
    const { username, email } = req.body
    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password')

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Add favorite algorithm
router.post('/favorites/:visualizationId', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { favoriteAlgorithms: req.params.visualizationId } },
      { new: true }
    ).select('-password')

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Remove favorite algorithm
router.delete('/favorites/:visualizationId', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { favoriteAlgorithms: req.params.visualizationId } },
      { new: true }
    ).select('-password')

    res.json(user)
  } catch (error) {
    next(error)
  }
})

export default router
