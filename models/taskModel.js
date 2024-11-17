import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        
    },
    completed: {
        type: bolean,
        default: false
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const User = mongoose.model('Task', taskSchema);

export default User;
