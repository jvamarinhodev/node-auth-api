import express from 'express';

import { postUserRegistration } from '../controllers/user/registerController.js';
import { postLoginAuthorization } from '../controllers/user/loginController.js';

const router = express.Router();

router.post('/register', postUserRegistration);
router.post('/login', postLoginAuthorization);
export default router;
