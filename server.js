import express from 'express';
import bodyParser from 'body-parser';


// Database connection to mongoDB
import './config/db.js'

// Importing routes
import authRoutes from './routes/authRoutes.js'


const app = express();
const port = 3000;

// middleware to parse JSON request bodies

app.use(bodyParser.json());

app.use('/api', authRoutes)

app.listen(port, () => {
    console.log(
        `Server is running on port ${port} and working at https://localhost:${port}`
    );
});
