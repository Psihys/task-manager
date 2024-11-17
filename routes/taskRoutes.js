import express from 'express';
import * as taskController from '../controlers/taskController.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.use(checkAuth);

/**
 * @swagger
 * /api/task:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create a new task
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Buy a book
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */

router.post('/task', taskController.createTask);
/**
 * @swagger
 * /api/task/all:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get all tasks (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 673a4ac089b51aedabc12345
 *                   description:
 *                     type: string
 *                     example: "Buy groceries"
 *                   completed:
 *                     type: boolean
 *                     example: false
 *                   createBy:
 *                     type: string
 *                     example: 673a3bcdf6e36a6849a56d9e8
 *       403:
 *         description: Access denied (not an admin)
 *       500:
 *         description: Server error
 */
router.get('/task/all', checkAdmin, taskController.getAllTasks);
/**
 * @swagger
 * /api/task:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get tasks created by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 673a4ac089b51aedabc12345
 *                   description:
 *                     type: string
 *                     example: "Finish the report"
 *                   completed:
 *                     type: boolean
 *                     example: true
 *                   createBy:
 *                     type: string
 *                     example: 673a3bcdf6e36a6849a56d9e8
 *       500:
 *         description: Server error
 */
router.get('/task', taskController.getTasksByUserId);
/**
 * @swagger
 * /api/task:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get tasks created by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 673a4ac089b51aedabc12345
 *                   description:
 *                     type: string
 *                     example: "Finish the report"
 *                   completed:
 *                     type: boolean
 *                     example: true
 *                   createBy:
 *                     type: string
 *                     example: 673a3bcdf6e36a6849a56d9e8
 *       500:
 *         description: Server error
 */
router.get('/task/:id', taskController.getTask);
/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     tags:
 *       - Task
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Update the report"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/task/:id', taskController.updateTask);
/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/task/:id', taskController.deleteTask);

export default router;
