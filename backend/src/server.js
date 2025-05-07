import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);


app.get('/', (req, res) => {
  res.send('API do SeboConnect está rodando! 📚');
});


app.use(errorHandler);


connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`\n=== SERVIDOR INICIADO ===`);
    console.log(`🚀 Servidor: http://localhost:${PORT}`);
    console.log(`📦 MongoDB: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Erro'}`);
    console.log(`🌐 CORS: Liberado para http://localhost:5173\n`);
  });
}).catch(err => {
  console.error('Falha na conexão com MongoDB:', err);
  process.exit(1);
});