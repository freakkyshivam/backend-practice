import expree from 'express'

import { SearchDrizzleRepository } from '../database/repository/search.drizzle.repository.js';
import { SearchService } from '../services/search.service.js';
import { SearchController } from '../controllers/search.controller.js';

const router = expree.Router();

const searchDrizzleRepository = new SearchDrizzleRepository();

const searchService = new SearchService(searchDrizzleRepository);

const searchController = new SearchController(searchService)

router.post('/products', searchController.create)
router.get('/products', searchController.getProducts)


export default router;