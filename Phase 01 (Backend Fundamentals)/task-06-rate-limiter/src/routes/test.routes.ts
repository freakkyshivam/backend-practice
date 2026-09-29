import express from 'express';
import { testController } from '../controllers/test.controller.js';
import { rateLimiterMiddleware } from '../middleware/rateLimiter.js';
const router = express.Router();

router.get('/test',rateLimiterMiddleware, testController);

export default router;