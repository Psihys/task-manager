import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Validation to ensure this field is always set
    },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
