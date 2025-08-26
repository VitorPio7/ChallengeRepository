import mongoose from "mongoose";


const comentariosSchema = new mongoose.Schema({
    autor: {
        type: String,
        required: [true, "O comentário precisa de um autor"],
        trim: true,
        maxLength: [50, "O nome do autor deve ser no máximo 50 caracteres."],
        minLength: [5, "O comentário deve ser no mínimo 5 caracteres"]
    },
    texto: {
        type: String,
        required: [true, "O comentário não deve estar vazio"],
        trim: true,
        maxLength: [300, "O comentário deve ter no máximo 300 caracteres"]
    },
    criadoEm: {
        type: Date,
        default: Date.now
    } 
})

const taskSchema = new mongoose.Schema({
    titulo: { 
        type:String, 
        required:[true, "É necessário colocar o titulo da tarefa."], 
        trim: true,
        maxLength: [70, "É necessário colocar no máximo 70 caracteres."],
        minLength: [2, "É necessário colocar no mínimo 2 caracteres."]
    },
    inicio: {
        type:String, 
        required:true
    },
    conclusao: {
        type:String, 
        required:[true, "Você precisa passar um data de conclusão"]
    },
    custoEstimado: {
        type:Number, 
        required:[true, "Você precisa passar um custo estimado."]
    },
    statusTarefa:{
        type:String, 
        require:[true, "Você precisa passar o status da sua tarefa."]
    },
    comentarios: [comentariosSchema]
},{timestamps:true});

export default mongoose.model("taskManager", taskSchema);
