import { Request, Response } from 'express';
import { findGroupTask, createGroupTask, getTasks, getByIdTask, addTask, updateTask, deleteTask } from '../models/Task.model';

export const createGroupTasks = (req: Request, res: Response) => {
    const groupTask = createGroupTask();

    res.json({ data: { groupTask: groupTask } });
}

export const findGroupTasks = (req: Request, res: Response) => {
    const { code } = req.body

    const idGroup = Number(code);

    if (isNaN(idGroup)) {
        return res.status(400).json({ message: 'Código inválido.' });
    }

    const groupTask = findGroupTask(idGroup);
    
    if (groupTask) {
        res.json({ data: { groupTask } });
    } else {
        res.status(404).json({ message: 'Grupo de tarefas não encontrado.' });
    }
}

export const getAllTasks = (req: Request, res: Response) => {
    const { idGroup } = req.params;
    const tasksList = getTasks(Number(idGroup));

    res.json({ data: { tasks: tasksList } });
}

export const getByIdTasks = (req: Request, res: Response) => {
    const { id, idGroup } = req.params;
    const task = getByIdTask(Number(idGroup), Number(id));

    if (task) {
        res.json({ data: { task } });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

export const createTask = (req: Request, res: Response) => {
    const { idGroup } = req.params;
    const { title } = req.body;

    if (title) {
        const task = addTask(Number(idGroup), title);
        if (task) {
            res.status(201).json({ data: { task } });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } else {
        res.status(400).json({ message: 'Title is required' });
    }
}

export const modifyTask = (req: Request, res: Response) => {
    const { id, idGroup } = req.params;
    const { title } = req.body;
    const updatedTask = updateTask(Number(idGroup), Number(id), title);

    if (updatedTask) {
        res.json({ data: { task: updatedTask } });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

export const removeTask = (req: Request, res: Response) => {
    const { idGroup, id } = req.params;
    const deletedTask = deleteTask(Number(idGroup), Number(id));

    if (deletedTask) {
        res.json({ data: { task: deletedTask } });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}