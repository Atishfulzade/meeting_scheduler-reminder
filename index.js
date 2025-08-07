import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDB.js';
import authRoutes from './routes/user.routes.js';
import meetingRoutes from './routes/meeting.routes.js';

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/meetings', meetingRoutes);

// Default route
app.get('/', (req, res) => {
  return res.json('Welcome to Meeting scheduler with reminders API');
});

// Start server
const port = process.env.PORT;
app.listen(port, () => console.log(`App is running on port ${port}`));
