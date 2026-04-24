# Algorithm Visualizer - Setup Guide

This guide will help you get the Algorithm Visualizer up and running.

## Step 1: Install Dependencies

```bash
# Install root dependencies
pnpm install

# Dependencies are automatically installed for backend and frontend
```

## Step 2: Configure MongoDB

### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows - use Services or run mongod.exe
   
   # Linux
   sudo systemctl start mongod
   ```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection URI
4. Skip to Step 3

## Step 3: Setup Backend Environment

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/algorithm-visualizer
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

## Step 4: Start Development Servers

### Option A: Run Both Simultaneously
```bash
cd /path/to/algorithm-visualizer
pnpm dev
```

This runs both backend and frontend concurrently.

### Option B: Run Separately (Recommended for Debugging)

**Terminal 1 - Backend**:
```bash
cd backend
pnpm dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
pnpm dev
```

## Step 5: Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your MONGODB_URI in .env
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Change PORT in backend .env
- Change port in frontend vite.config.ts

### CORS Errors
- Ensure CORS_ORIGIN in .env matches your frontend URL
- Check that backend is running on the correct port

### Dependencies Not Installing
- Clear pnpm cache: `pnpm store prune`
- Remove node_modules: `rm -rf node_modules backend/node_modules frontend/node_modules`
- Reinstall: `pnpm install`

## Project File Structure

```
algorithm-visualizer/
├── backend/
│   ├── src/
│   │   ├── server.ts              # Main server entry
│   │   ├── config/
│   │   │   └── database.ts        # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.ts            # User schema
│   │   │   └── Visualization.ts   # Saved visualizations
│   │   ├── routes/
│   │   │   ├── authRoutes.ts      # Authentication
│   │   │   ├── algorithmRoutes.ts # Algorithm execution
│   │   │   └── userRoutes.ts      # User management
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts  # JWT verification
│   │   │   └── errorHandler.ts    # Error handling
│   │   └── services/
│   │       └── algorithmService.ts # Algorithm implementations
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx              # Header/Footer wrapper
│   │   │   ├── ProtectedRoute.tsx      # Auth guard
│   │   │   ├── VisualizerComponent.tsx # Bar chart visualization
│   │   │   ├── AlgorithmControls.tsx   # Play/pause/speed
│   │   │   └── StepDisplay.tsx         # Step information
│   │   ├── pages/
│   │   │   ├── HomePage.tsx        # Landing page
│   │   │   ├── LoginPage.tsx       # Login form
│   │   │   ├── SignupPage.tsx      # Signup form
│   │   │   ├── DashboardPage.tsx   # Algorithm selection
│   │   │   └── VisualizerPage.tsx  # Main visualizer
│   │   ├── context/
│   │   │   └── AuthContext.tsx     # Auth state management
│   │   ├── App.tsx                 # Router setup
│   │   ├── main.tsx                # React entry
│   │   └── globals.css             # Global styles
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.ts          # Tailwind setup
│   ├── postcss.config.js           # PostCSS plugins
│   ├── index.html                  # HTML entry
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                    # Root package.json
├── README.md                       # Main documentation
├── SETUP.md                        # This file
└── DEPLOY.md                       # Deployment guide
```

## Next Steps

1. **Explore the code**: Start with `backend/src/server.ts` and `frontend/src/App.tsx`
2. **Create an account**: Sign up at http://localhost:5173/signup
3. **Test an algorithm**: Go to dashboard and select "Bubble Sort"
4. **Customize**: Modify algorithm implementations or UI components

## Development Tips

- **Hot Reload**: Changes are automatically reflected without restarting
- **TypeScript**: Full type safety across frontend and backend
- **API Requests**: Use Axios in frontend, all requests include auth token
- **Database**: Use MongoDB Compass to visualize your data
- **Debugging**: Use browser DevTools (F12) for frontend, console logs for backend

## Building for Production

See DEPLOY.md for detailed deployment instructions for:
- Vercel (Frontend)
- Railway or Heroku (Backend)
- MongoDB Atlas (Database)

---

Need help? Check the main README.md or open an issue!
