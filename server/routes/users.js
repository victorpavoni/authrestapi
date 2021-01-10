import express from 'express';
const router = express.Router();

import { usersList, usersCreate } from '../controllers/users.js';

router.get('/list', usersList);
router.post('/create', usersCreate);

export default router;