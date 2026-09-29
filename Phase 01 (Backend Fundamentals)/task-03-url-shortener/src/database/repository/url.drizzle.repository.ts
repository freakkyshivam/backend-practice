import { eq } from "drizzle-orm";
import type { UrlDbRes } from "../../@types/url.types.js";
import type { UrlInterface } from "../../interfaces/url.interface.js";
import db from "../connection/db.js";
import urlSchema from "../schema/Urls.schema.js";


export class UrlDrizzleRepository implements UrlInterface{

   async createShortUrl(shortCode: string, originalUrl: string): Promise<UrlDbRes | null> {
        try {
            const [result] = await db
            .insert(urlSchema)
            .values({
                shortCode,
                originalUrl
            }).returning();

            return result ? result : null;
        } catch (err) {
            throw err;
        }
    }


    async getUrlDetails(shortCode: string): Promise<UrlDbRes | null> {
        try {
            const [result] = await db
            .select()
            .from(urlSchema)
            .where(eq(
                urlSchema.shortCode, shortCode
            )).limit(1);

            return result ? result : null;
        } catch (err) {
            throw err;
        }
    }

}