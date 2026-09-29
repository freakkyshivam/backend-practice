import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import productsRouter from './routes/search.route.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.json({ msg: 'Server is running' });
});

app.use('/', productsRouter);

export default app;
