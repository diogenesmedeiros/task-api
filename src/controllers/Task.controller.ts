import { Request, Response } from 'express';
import { addTaskService, createGroupTaskService, deleteTaskService, findGroupTaskService, getByIdTaskService, getTasksService, updateTaskService } from '../services/Task.service';

export const createGroupTasks = async (req: Request, res: Response) => {
    const { password } = req.body;
    try {
        const groupTask = await createGroupTaskService({ password });
        res.json({ data: { groupTask } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group task', error });
    }
};

export const findGroupTasks = async (req: Request, res: Response) => {
    const { code, password } = req.body;
    const idGroup = Number(code);

    if (isNaN(idGroup)) {
        return res.status(400).json({ message: 'Código inválido.' });
    }

    try {
        const groupTask = await findGroupTaskService({ id: idGroup, password: password });
        if (groupTask) {
            res.json({ data: { groupTask } });
        } else {
            res.status(404).json({ message: 'Grupo de tarefas não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error finding group task', error });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    const { idGroup } = req.params;
    try {
        const tasksList = await getTasksService({ id: Number(idGroup) });
        res.json({ data: { tasks: tasksList } });
    } catch (error) {
        res.status(500).json({ message: 'Error getting tasks', error });
    }
};

export const getByIdTasks = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await getByIdTaskService({ id: Number(id) });
        if (task) {
            res.json({ data: { task } });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error finding task by ID', error });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const { idGroup } = req.params;
    const { title } = req.body;

    if (title) {
        try {
            const task = await addTaskService({ id: Number(idGroup) }, { title });
            if (task) {
                res.status(201).json({ data: { task } });
            } else {
                res.status(404).json({ message: 'Group not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    } else {
        res.status(400).json({ message: 'Title is required' });
    }
};

export const modifyTask = async (req: Request, res: Response) => {
    const { id, idGroup } = req.params;
    const { title } = req.body;

    try {
        const updatedTask = await updateTaskService({ id: Number(id), title });
        if (updatedTask) {
            res.json({ data: { task: updatedTask } });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

export const removeTask = async (req: Request, res: Response) => {
    const { idGroup, id } = req.params;

    try {
        const deletedTask = await deleteTaskService({ id: Number(id) });
        if (deletedTask) {
            res.json({ data: { task: deletedTask } });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};