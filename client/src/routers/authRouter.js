import express from 'express';
import { attachToken } from '../services/middleware/auth.js';
import { postRegister, getRegister } from '../controllers/registerController.js';
import { postLogin, getLogin } from '../controllers/loginController.js';
import { getProfileView, getProfile } from '../controllers/private/profileController.js';
import { publicAccess } from '../controllers/private/publicUserController.js';

export const router = express.Router();

router.post('/register', postRegister);
router.get('/register', getRegister);
router.post('/login', postLogin);
router.get('/login', getLogin);
router.get('/home/profile', publicAccess);
router.get('/private/profile', attachToken, getProfileView, getProfile);
