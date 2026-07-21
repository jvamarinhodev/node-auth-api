import express from 'express';
import { postRegister, getRegister } from '../controllers/registerController.js';
import { postLogin, getLogin } from '../controllers/loginController.js';

export const router = express.Router();

router.post('/register', postRegister);
router.get('/register', getRegister);
router.post('/login', postLogin)
router.get('/login', getLogin)
