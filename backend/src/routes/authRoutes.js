import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const user = new User({ username, email, password })
    await user.save()

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    })
  } catch (error) {
    next(error)
  }
})

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this',
      { expiresIn: '7d' }
    )

    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    })
  } catch (error) {
    next(error)
  }
})

// Verify token
router.get('/verify', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    res.json({ user })
  } catch (error) {
    next(error)
  }
})

export default router
