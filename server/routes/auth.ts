import Router from 'express';
import {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} from '../controllers/userController';

export const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.get('/allusers/:id', getAllUsers);
authRoutes.post('/setavatar/:id', setAvatar);
authRoutes.get('/logout/:id', logOut);
