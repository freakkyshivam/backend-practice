
import {DrizzleResourceRepository} from '../../database/repository/drizzle.resource_repository.js'
import { ResourceServie } from './resource.service.js';

const drizzleResourceRepository = new DrizzleResourceRepository();

export const resourceService = new ResourceServie(drizzleResourceRepository);

