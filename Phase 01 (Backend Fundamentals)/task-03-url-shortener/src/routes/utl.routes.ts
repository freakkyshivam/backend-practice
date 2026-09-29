import express from 'express';
import { UrlController } from '../controllers/url.controller.js';
import urlService from '../url.container.js';

const router = express.Router();

const urlController = new UrlController(urlService);

router.post('/urls', urlController.createShortUrl)
router.get('/urls/:shortCode', urlController.getUrlDetails)
router.get('/:shortCode', urlController.redirectToOriginalUrl)

export default router;