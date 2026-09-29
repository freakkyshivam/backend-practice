
import expresss from 'express'
import { ResourceController } from './resource.controller.js'
import { resourceService } from './resource.container.js'
import { uploads } from '../../middleware/multer.js';
import { rateLimiter } from '../../middleware/rateLimiter.js';

const resourceController = new ResourceController(resourceService);


const router = expresss.Router();


router.post('/resources', rateLimiter, resourceController.create);
router.get('/resources',rateLimiter, resourceController.getAll);
router.get('/resources/:id',rateLimiter, resourceController.getSingle);
router.patch('/resources/:id',rateLimiter, resourceController.update);
router.delete('/resources/:id',rateLimiter, resourceController.delete);
router.post('/resources/:id/file',rateLimiter, uploads.single('uploaded_resource'), resourceController.fileUpload)

export default router;
