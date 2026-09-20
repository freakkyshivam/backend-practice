import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import urlRouter from './routes/utl.routes.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.json({ msg: 'Server is running' });
});

app.use('/', urlRouter);

export default app;
