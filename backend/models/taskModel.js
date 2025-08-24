import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    titulo: { 
        type:String, 
        required:[true, "É necessário colocar o titulo da tarefa."], 
        trim: true,
        maxLength: [70, "É necessário colocar no máximo 70 caracteres."],
        minLength: [2, "É necessário colocar no mínimo 2 caracteres."]
    },
    inicio: {
        type:Date, 
        required:true
    },
    conclusao: {
        type:Date, 
        required:[true, "Você precisa passar um data de conclusão"]
    },
    custoEstimado: {
        type:Boolean, 
        required:[true, "Você precisa passar um custo estimado."]
    },
    statusTarefa:{
        type:String, 
        require:[true, "Você precisa passar o status da sua tarefa."]
    }
},{timestamps:true});

export default mongoose.model("Task", taskSchema);
