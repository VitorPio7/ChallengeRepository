import Task from "../models/taskModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getTasks = catchAsync(async (req, res)=>{
    const tasks = await Task.find();
    if (!tasks) {
        return next((new AppError('Não existe tarefas!', 404)))
    }
    res.status(200).json({
        status: 'Tasks adquiridas com sucesso!',
        results: tasks.length,
        data: {
            tasks
        }
    });
});

export const getTask = catchAsync(async (req, res, next)=> {
    const task = await Task.findById(req.params.id);
    if(!task){
        return next(new AppError('Nenhuma tarefa encontrada com essa informação', 404));
    }
    res.status(200).json({
        status: 'Encontramos a sua tarefa!',
        data: {
         task
        }
    })
})
export const createTask = catchAsync(async (req, res) =>{
    const { title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.status(201).json({
        status: 'success',
        results: task.length,
        data:{
            task
        }
    });
})
export const updateTask = async(req, res) =>{
    const {id} = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, req.body, {new: true});
    if(!updateTask){
        return next(new AppError("Nenhum dado encontrado com essa ID", 404));
    }
    res.status(200).json({
        status: 'Atualização da task realizada com sucesso!',
        data: {
            updateTask
        }
    })
}
export const deleteTask = async (req, res) =>{
    const {id} = req.params;
    const deletarTask = await Task.findByIdAndDelete(id);
    if(!deletarTask) {
       return next(new AppError('Nenhuma task encontrada com esse ID', 404)) 
    }
    res.status(204).json({message: "Tarefa removida"});
}