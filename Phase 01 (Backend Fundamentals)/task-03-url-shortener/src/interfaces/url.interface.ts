
import type { UrlDbRes } from "../@types/url.types.js";

export interface UrlInterface{
    createShortUrl(shortCode : string, originalUrl : string) : Promise<UrlDbRes | null>;


    getUrlDetails(shortCode : string) : Promise<UrlDbRes | null>;

}