import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

// Database connection to mongoDB
import './config/db.js'

// Importing routes
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js';
import swaggerSpec from './config/swagger.js';

const app = express();
const port = 3000;

// middleware to parse JSON request bodies

app.use(bodyParser.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api', authRoutes)

app.use('/api', taskRoutes)

app.listen(port, () => {
    console.log(
        `Server is running on port ${port} and working at https://localhost:${port}`
    );
});
