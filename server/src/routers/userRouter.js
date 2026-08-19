import express from 'express';

import { getListUser } from '../controllers/private/viewerUsersController.js';
import { postUserRegistration } from '../controllers/user/registerController.js';
import { postLoginAuthorization } from '../controllers/user/loginController.js';
import { authorization } from '../middlewares/authorization.js';
import { postRefreshToken } from '../controllers/user/authRefreshTokenController.js';
import { postLogoutUser } from '../controllers/user/authLogout.js';
import { getPublicAccess } from '../controllers/user/publicUsersController.js';

const router = express.Router();

router.post('/register', postUserRegistration);
router.post('/login', postLoginAuthorization);
router.get('/profile', getPublicAccess);
router.get('/auth/profile/', authorization(process.env.JWT_ACCESS_TOKEN), getListUser);
router.post('/auth/refreshtoken', authorization(process.env.JWT_REFRESH_TOKEN), postRefreshToken);
router.post('/auth/logout', postLogoutUser);
export default router;
