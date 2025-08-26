import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: './.env' });
const porta = process.env.PORT || 5000;
mongoose.connect(process.env.DB)
    .then(() => console.log("MongoDB conectado com sucesso."))
    .catch(err => console.error("Erro ao conectar com MongoDB:", err));

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}.`));
