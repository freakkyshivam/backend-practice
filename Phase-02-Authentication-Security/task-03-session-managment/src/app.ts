import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as pinoHttp from "pino-http";
import { logger } from './config/logger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  pinoHttp.pinoHttp({
    logger,

    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
        };
      },

      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  })
);

app.get('/', (req, res) => {
  req.log.info("Home route called");
  res.json({ msg: 'Server is running' });
});

export default app;
