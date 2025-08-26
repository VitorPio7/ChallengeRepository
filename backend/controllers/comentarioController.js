import Task from "../models/taskModel.js"
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const addComentario = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {autor, texto} = req.body;

    const task = await Task.findById(id);
    if(!task) {
       return next(new AppError("Nenhuma tarefa encontrada com esse id!"))
    }
    task.comentarios.push({autor, texto});
    await task.save();
    res.status(201).json({message: "Comentário adicionado com sucesso!"})
})

export const getComments = catchAsync(async (req, res)=>{
  const {id} = req.params;
  const task = await Task.findById(id).select("comentarios");
  if(!task) {
      return next(new AppError("Tarefa ou comentário inexistente."))
  }
  res.status(200).json(task.comentarios);
})