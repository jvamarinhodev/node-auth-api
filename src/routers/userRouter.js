import express from 'express';

import { getListUser } from '../controllers/private/viewerUsersController.js';
import { postUserRegistration } from '../controllers/user/registerController.js';
import { postLoginAuthorization } from '../controllers/user/loginController.js';
import { authorization } from '../middlewares/authorization.js';
import { postRefreshToken } from '../controllers/user/authRefreshTokenController.js';

const router = express.Router();

router.post('/register', postUserRegistration);
router.post('/login', postLoginAuthorization);
router.get('/auth/profile/', authorization, getListUser);
router.post('/auth/refreshtoken', postRefreshToken);
export default router;
