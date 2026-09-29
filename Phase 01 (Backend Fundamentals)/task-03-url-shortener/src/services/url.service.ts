import type { UrlDbRes } from "../@types/url.types.js";
import type { UrlInterface } from "../interfaces/url.interface.js";


export class UrlService {
    constructor(
        private readonly urlInterface : UrlInterface
    ){

    }

    async createShortUrl(shortCode : string, originalUrl : string) : Promise<UrlDbRes | null>{
        try {
            const result = await this
            .urlInterface
            .createShortUrl(shortCode, originalUrl);

            return result;
        } catch (err) {
            throw err;
        }
    }


    async getUrlDetails(shortCode : string):Promise<UrlDbRes | null>{
        try {
            const result =  await this
            .urlInterface
            .getUrlDetails(shortCode);

            return result;
        } catch (err) {
            throw err;
        }
    }
}