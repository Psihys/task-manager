import Task from '../models/taskModel.js';


export const createTask = async (req, res) => {
    try {
        console.log('Request User ID:', req.user.id); // Debug log to verify user ID

        const { description } = req.body;

        const userId = req.user.id; // Use `id` from `req.user`

        if (!userId) {
            return res
                .status(400)
                .json({ message: 'User ID is required for creating tasks' });
        }

        const taskObject = {
            description,
            createBy: userId, // Set the user ID in the `createBy` field
        };

        console.log('Task Object:', taskObject); // Debug log to verify task data

        const task = await Task.create(taskObject);

        console.log('Created Task:', task); // Debug log to verify created task

        return res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error); // Log the error
        res.status(400).json({ message: 'Error creating task' });
    }
};




export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, createBy: userId },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findByIdAndDelete({
            _id: taskId,
            createBy: userId,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Faild to delete the task' });
    }
};

export const getTasksByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({
            createBy: userId,
        });

        return res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: 'Failed to find all tasks' });
    }
};

export const getTask = async (req, res) => {
    try {
        console.log('Request Params:', req.params); // Debug log for params
        console.log('Authenticated User:', req.user); // Debug log for authenticated user

        const taskId = req.params.id; // Task ID from URL
        const userId = req.user._id; // User ID from authentication middleware

        console.log('Querying Task with:', { _id: taskId, createBy: userId }); // Debug log for query

        const task = await Task.findOne({
            _id: taskId,
            createBy: userId,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error); // Log detailed error
        res.status(400).json({ message: 'Failed to find task' });
    }
};


export const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find();

        return res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: 'Failed to get all tasks' });
    }
}