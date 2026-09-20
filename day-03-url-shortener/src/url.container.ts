import { UrlDrizzleRepository } from "./database/repository/url.drizzle.repository.js";
import { UrlService } from "./services/url.service.js";


const urlDrizzleRepository = new UrlDrizzleRepository();
export const urlService = new UrlService(urlDrizzleRepository);

export default urlService;