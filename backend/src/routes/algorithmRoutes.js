import express from 'express'
import Visualization from '../models/Visualization.js'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { executeAlgorithm } from '../services/algorithmService.js'

const router = express.Router()

// Get all available algorithms
router.get('/available', (req, res) => {
  const algorithms = [
    // Sorting
    { id: 'bubble-sort', name: 'Bubble Sort', category: 'sorting', description: 'Simple comparison-based sorting' },
    { id: 'quick-sort', name: 'Quick Sort', category: 'sorting', description: 'Divide and conquer sorting' },
    { id: 'merge-sort', name: 'Merge Sort', category: 'sorting', description: 'Stable divide and conquer sorting' },
    { id: 'insertion-sort', name: 'Insertion Sort', category: 'sorting', description: 'Incremental sorting algorithm' },
    { id: 'selection-sort', name: 'Selection Sort', category: 'sorting', description: 'Selection-based sorting' },
    { id: 'heap-sort', name: 'Heap Sort', category: 'sorting', description: 'Heap-based sorting algorithm' },
    // Graph
    { id: 'dfs', name: 'Depth First Search', category: 'graph', description: 'Graph traversal using stack' },
    { id: 'bfs', name: 'Breadth First Search', category: 'graph', description: 'Graph traversal using queue' },
    { id: 'dijkstra', name: "Dijkstra's Algorithm", category: 'graph', description: 'Shortest path algorithm' },
    { id: 'kruskal', name: "Kruskal's Algorithm", category: 'graph', description: 'Minimum spanning tree' },
    // Tree
    { id: 'inorder-traversal', name: 'Inorder Traversal', category: 'tree', description: 'Left-Root-Right tree traversal' },
    { id: 'preorder-traversal', name: 'Preorder Traversal', category: 'tree', description: 'Root-Left-Right tree traversal' },
    { id: 'postorder-traversal', name: 'Postorder Traversal', category: 'tree', description: 'Left-Right-Root tree traversal' },
    // Search
    { id: 'linear-search', name: 'Linear Search', category: 'search', description: 'Sequential search' },
    { id: 'binary-search', name: 'Binary Search', category: 'search', description: 'Divide and conquer search' },
    // Dynamic Programming
    { id: 'fibonacci', name: 'Fibonacci', category: 'dynamic', description: 'Dynamic programming sequence' },
    { id: 'longest-common-subsequence', name: 'LCS', category: 'dynamic', description: 'Longest common subsequence' },
  ]
  res.json(algorithms)
})

// Execute algorithm
router.post('/execute', async (req, res, next) => {
  try {
    const { algorithmId, inputData } = req.body

    if (!algorithmId) {
      return res.status(400).json({ error: 'Algorithm ID required' })
    }

    const result = executeAlgorithm(algorithmId, inputData)
    
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// Save visualization
router.post('/save', authenticateToken, async (req, res, next) => {
  try {
    const { algorithmId, algorithmName, category, inputData, steps } = req.body

    const visualization = new Visualization({
      userId: req.userId,
      algorithmId,
      algorithmName,
      category,
      inputData,
      steps,
    })

    await visualization.save()
    res.status(201).json(visualization)
  } catch (error) {
    next(error)
  }
})

// Get user's saved visualizations
router.get('/saved', authenticateToken, async (req, res, next) => {
  try {
    const visualizations = await Visualization.find({ userId: req.userId })
    res.json(visualizations)
  } catch (error) {
    next(error)
  }
})

// Get single visualization
router.get('/saved/:id', authenticateToken, async (req, res, next) => {
  try {
    const visualization = await Visualization.findById(req.params.id)
    
    if (!visualization || visualization.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Visualization not found' })
    }

    res.json(visualization)
  } catch (error) {
    next(error)
  }
})

// Delete visualization
router.delete('/saved/:id', authenticateToken, async (req, res, next) => {
  try {
    const visualization = await Visualization.findById(req.params.id)
    
    if (!visualization || visualization.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Visualization not found' })
    }

    await Visualization.deleteOne({ _id: req.params.id })
    res.json({ message: 'Visualization deleted' })
  } catch (error) {
    next(error)
  }
})

export default router
