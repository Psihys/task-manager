import express from 'express';
import * as authController from '../controlers/authControler.js';

const router = express.Router();

// Register a new user

router.post('/auth/register', authController.register);

// Login an existing user   

router.post('/auth/login', authController.login);

export default router;