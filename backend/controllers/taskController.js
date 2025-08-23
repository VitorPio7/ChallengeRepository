import Task from "../models/taskModel.js";

export const getTasks = async (req, res)=>{
    const tasks = await Task.find();
    res.json(tasks);
}

export const createTask = async (req, res) =>{
    const { title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.status(201).json(task);
}
export const updateTask = async(req, res) =>{
    const {id} = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, req.body, {new: true});
    res.json(updateTask)
}
export const deleteTask = async (req, res) =>{
    const {id} = req.params;
    await Task.findByIdAndDelete(id);
    res.json({message: "Tarefa removida"});
}