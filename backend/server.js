const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const { seedExercises } = require('./utils/seedExercises');
const { seedDemoUserData } = require('./utils/seedDemoData');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const weightRoutes = require('./routes/weightRoutes');
const goalRoutes = require('./routes/goalRoutes');
const calorieRoutes = require('./routes/calorieRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/calories', calorieRoutes);
app.use('/api/stats', statsRoutes);

// Static frontend serving for single unified website URL
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handling middleware for API routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server after connecting to database
const startServer = async () => {
  try {
    await connectDB();
    await seedExercises();
    await seedDemoUserData();

    app.listen(PORT, () => {
      console.log(`======================================================`);
      console.log(`🚀 Unified App & API Server running on http://localhost:${PORT}`);
      console.log(`======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
