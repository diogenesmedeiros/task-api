import express from 'express';
import { getAllTasks, getByIdTasks, createTask, modifyTask, removeTask, createGroupTasks, findGroupTasks } from '../controllers/Task.controller'

const router = express.Router();

router.get('/', createGroupTasks);
router.post('/', findGroupTasks);
router.get('/:idGroup/tasks', getAllTasks);
router.get('/:idGroup/tasks/:id', getByIdTasks);
router.post('/:idGroup/tasks', createTask);
router.put('/:idGroup/tasks/:id', modifyTask);
router.delete('/:idGroup/tasks/:id', removeTask);

export default router;