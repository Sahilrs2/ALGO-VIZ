export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  // Validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate field value entered' })
  }

  // Default error
  return res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
}