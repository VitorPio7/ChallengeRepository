import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js'

const app = express();
const porta = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tarefas");

app.use("/api/tasks",taskRoutes);
app.use(globalErrorHandler);
app.listen(porta, ()=> console.log(`Servidor rodando na porta ${porta}.`))
