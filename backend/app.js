import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import taskRoutes from './routes/taskRoutes.js';
import helmet from "helmet";
import globalErrorHandler from './controllers/errorController.js';
import express from 'express';
import cors from "cors";

const app = express();
const limitador = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Você realizou vários requests desse IP. Favor aguardar 15 minutos."
});

app.use(helmet());
app.use(limitador);
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        erro: "Rota não encontrada.",
        caminho: req.originalUrl
    });
});

app.use(globalErrorHandler);
export default app;