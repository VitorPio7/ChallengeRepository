import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import helmet from "helmet";
import globalErrorHandler from './controllers/errorController.js'
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv'

dotenv.config({path:'./.env'});
const app = express();
const porta = process.env.PORT || 5000;
const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:"você realizou varios requests nesse IP, favor esperar 15 minutos."   
})
app.use(mongoSanitize());

app.use((req, res, next)=>{
    res.status(404).json({
        erro: "Rota não encontrada.",
        caminho: req.originalUrl
    })
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({
        erro: "Erro interno no servidor."
    })
})
app.use(limitador);
app.use(cors());
app.use(express.json());
app.use(helmet())
mongoose.connect(process.env.DB);
app.use("/api/tasks",taskRoutes);
app.use(globalErrorHandler);
app.listen(porta, ()=> console.log(`Servidor rodando na porta ${porta}.`))
