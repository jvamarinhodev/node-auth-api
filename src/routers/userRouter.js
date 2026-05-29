import express from 'express';

import { postUserRegistration } from '../controllers/user/registerController.js';

const router = express.Router();

router.post('/register', postUserRegistration);
export default router;
