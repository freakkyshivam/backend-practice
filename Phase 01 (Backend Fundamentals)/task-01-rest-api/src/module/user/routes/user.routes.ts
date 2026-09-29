
import express from 'express';
import { UserController } from '../controller/user.controller.js';
import { userService } from '../user.container.js';
import { currUser } from '../middleware/currUser.js';

const userController = new UserController(userService);

const router = express();

router.post('/register', userController.create.bind(userController));
router.post('/login', userController.login.bind(userController));

router.get('/', currUser, userController.getCurrUser)

export default router;