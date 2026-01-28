import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected Successfully (ESM)");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send("Startup Benefits API is running with ES Modules...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server spinning on http://localhost:${PORT}`));