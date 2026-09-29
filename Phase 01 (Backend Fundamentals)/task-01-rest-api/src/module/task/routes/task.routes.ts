import express from 'express'
import { TaskController } from '../controller/task.controller.js';
import { taskService } from '../task.container.js';
import { currUser } from '../../user/middleware/currUser.js';


const router = express.Router();

const taskController = new TaskController(taskService);

router.post('/create',currUser, taskController.createTask);
router.get('/',currUser, taskController.getAllTasks);
router.get('/:id',currUser, taskController.getSingleTask);
router.patch('/:id', currUser, taskController.updateTask);
router.delete('/:id', currUser, taskController.deleteTask)

export default router;