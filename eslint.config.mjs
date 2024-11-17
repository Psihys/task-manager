import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
    {
        
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.node, // Use Node.js globals (optional, if needed)
            },
        },
        rules: {
            curly: 0,
            'no-unexpected-multiline': 0,
            'no-unused-vars': 0,
        },
    },
    prettier,
];
