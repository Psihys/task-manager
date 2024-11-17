import express from 'express';
import * as taskController from '../controlers/taskController.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.use(checkAuth);
// create task
router.post('/task', taskController.createTask);
// get all  tasks as admin
router.get('/task/all', checkAdmin, taskController.getAllTasks);
// get tasks by user id
router.get('/task', taskController.getTasksByUserId);
//get tasks 
router.get('/task/:id', taskController.getTask);
//update task
router.put('/task/:id', taskController.updateTask);
//delete task
router.delete('/task/:id', taskController.deleteTask);

export default router;