import { Request, Response } from 'express'
import { getTasks, getByIdTask, addTask, updateTask, deleteTask } from '../models/Task.model'

export const getAllTasks = (req: Request, res: Response) => {
    res.json({ 'data': {
        'message': getTasks()
    }})
}

export const getByIdTasks = (req: Request, res: Response) => {
    const { id } = req.params

    res.json({ 'data': {
        'message': getByIdTask(Number(id))
    }})
}

export const createTask = (req: Request, res: Response) => {
    const { title } = req.body
  
    if (title) {
        const task = addTask(title)
    
        res.status(201).json(task)
    } else {
        console.log(title)
        res.status(400).json({ message: 'Title is required' })
    }
}

export const modifyTask = (req: Request, res: Response) => {
    const { id } = req.params
    const { title } = req.body
    const updatedTask = updateTask(Number(id), title)
  
    if (updatedTask) {
        res.json(updatedTask)
    } else {
        res.status(404).json({ message: 'Task not found' })
    }
}

export const removeTask = (req: Request, res: Response) => {
    const { id } = req.params
    const deletedTask = deleteTask(Number(id))
  
    if (deletedTask) {
        res.json(deletedTask)
    } else {
        res.status(404).json({ message: 'Task not found' })
    }
}
