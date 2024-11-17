import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        // Use "definition" instead of "definitions"
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            description: 'Task Manager application',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Adjust the path to match your actual route files directory
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
