import express from 'express';
import { postRegister, getRegister } from '../controllers/userController.js';

export const router = express.Router();

router.post('/register', postRegister);
router.get('/register', getRegister);
