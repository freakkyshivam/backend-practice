import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { testController } from './controllers/test.controller.js';
import { idempotecyMid } from './middleware/idempotency.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.json({ msg: 'Server is running' });
});

app.post('/api/orders', idempotecyMid, testController)

export default app;
