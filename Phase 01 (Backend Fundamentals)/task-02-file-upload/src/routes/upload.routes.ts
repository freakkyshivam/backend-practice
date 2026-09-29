import express from 'express';
import upload from '../middlewares/multer.js';
import { deleteFile, getFile, uploadFile } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/files', upload.single('uploded_files'), uploadFile)
router.get('/files/:fileName',  getFile)
router.delete('/files/:fileName',  deleteFile)

export default router;