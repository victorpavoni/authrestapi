import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Routes import
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

import { auth } from './middlewares/auth.js';

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/AuthRestAPI';

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', auth, usersRouter);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
	.catch(err => console.log('Error message:', err));




