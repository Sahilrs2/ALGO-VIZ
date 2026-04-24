# Algorithm Visualizer - MERN Stack

An interactive web application for visualizing algorithms with step-by-step execution, performance metrics, and educational explanations. Built with a strict MERN stack (MongoDB, Express, React, Node.js).

## Features

- **15+ Algorithms** across 5 categories:
  - Sorting: Bubble Sort, Quick Sort, Merge Sort, Insertion Sort, Selection Sort, Heap Sort
  - Graph: DFS, BFS, Dijkstra's Algorithm, Kruskal's Algorithm
  - Tree: Inorder, Preorder, Postorder Traversal
  - Search: Linear Search, Binary Search
  - Dynamic Programming: Fibonacci, Longest Common Subsequence

- **Interactive Visualization**: Watch algorithms execute step-by-step with animated bar charts and detailed explanations
- **Performance Metrics**: View time complexity, space complexity, comparisons, and swap counts
- **Authentication**: Secure user accounts with JWT tokens and password hashing
- **Save & Compare**: Save visualization results and access them later
- **Responsive Design**: Dark navy theme with glassmorphism effects and smooth Framer Motion animations

## Project Structure

```
algorithm-visualizer/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (Auth)
│   │   ├── App.tsx          # Main app with routing
│   │   └── main.tsx         # Entry point
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── package.json
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── server.ts        # Main server file
│   │   ├── config/          # Configuration (database)
│   │   ├── models/          # Mongoose models (User, Visualization)
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth and error handling
│   │   └── services/        # Algorithm execution logic
│   ├── tsconfig.json
│   └── package.json
│
└── package.json             # Root package.json
```

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (or npm/yarn)
- MongoDB instance (local or Atlas)

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup backend environment**:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Install backend and frontend packages**:
   ```bash
   pnpm install
   cd ../frontend && pnpm install
   cd ..
   ```

### Running Locally

1. **Start development servers**:
   ```bash
   pnpm dev
   ```

   This runs both backend (port 5000) and frontend (port 5173) concurrently.

2. **Or run separately**:
   ```bash
   # Terminal 1 - Backend
   pnpm server

   # Terminal 2 - Frontend
   pnpm client
   ```

3. Open http://localhost:5173 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token (requires auth)

### Algorithms
- `GET /api/algorithms/available` - Get all available algorithms
- `POST /api/algorithms/execute` - Execute an algorithm (requires auth)
- `GET /api/algorithms/saved` - Get saved visualizations (requires auth)
- `POST /api/algorithms/save` - Save a visualization (requires auth)
- `GET /api/algorithms/saved/:id` - Get specific visualization (requires auth)
- `DELETE /api/algorithms/saved/:id` - Delete visualization (requires auth)

### User
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update profile (requires auth)
- `POST /api/users/favorites/:visualizationId` - Add favorite (requires auth)
- `DELETE /api/users/favorites/:visualizationId` - Remove favorite (requires auth)

## Algorithm Complexity

| Algorithm | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Bubble Sort | O(n²) | O(1) |
| Quick Sort | O(n log n) avg | O(log n) |
| Merge Sort | O(n log n) | O(n) |
| Insertion Sort | O(n²) | O(1) |
| Selection Sort | O(n²) | O(1) |
| Heap Sort | O(n log n) | O(1) |
| Linear Search | O(n) | O(1) |
| Binary Search | O(log n) | O(1) |
| DFS | O(V + E) | O(V) |
| BFS | O(V + E) | O(V) |

## Building for Production

### Backend
```bash
cd backend
pnpm build
pnpm start
```

### Frontend
```bash
cd frontend
pnpm build
# Output in dist/ folder
```

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set build command: `cd frontend && pnpm build`
3. Set start command: `pnpm client`
4. Deploy automatically on push

### Backend (Railway/Heroku/AWS)
1. Set environment variables (MONGODB_URI, JWT_SECRET, CORS_ORIGIN)
2. Deploy with: `pnpm start`
3. Update frontend API URL in environment variables

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/algorithm-visualizer
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Performance Considerations

- Algorithm visualizations include step-by-step tracking with detailed metrics
- Database queries are optimized with MongoDB indexing
- Frontend uses Vite for fast hot module replacement
- Animations use GPU acceleration via Framer Motion
- JWT tokens expire after 7 days

## Future Enhancements

- Graph and tree visualization rendering
- Advanced algorithm categories (greedy, backtracking, etc.)
- Code generation with syntax highlighting
- Performance comparison charts
- Algorithm difficulty levels and tutorials
- Real-time collaborative learning
- Mobile app version
- Dark/light theme toggle
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Push to branch
5. Open a pull request

## License

MIT License - Feel free to use this project for learning and personal use.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for learning algorithms through visualization**
