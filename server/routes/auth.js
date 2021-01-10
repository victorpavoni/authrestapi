import express from 'express';
const router = express.Router();

import { authLogin, authRegister } from '../controllers/auth.js';
  
router.post('/login', authLogin);
router.post('/register', authRegister);

export default router;