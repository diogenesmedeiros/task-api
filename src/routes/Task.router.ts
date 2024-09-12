import express from 'express';
import { getAllTasks, getByIdTasks, createTask, modifyTask, removeTask } from '../controllers/Task.controller'

const router = express.Router()

router.get('/', getAllTasks)
router.get('/:id', getByIdTasks)
router.post('/', createTask)
router.put('/:id', modifyTask)
router.delete('/:id', removeTask)

export default router