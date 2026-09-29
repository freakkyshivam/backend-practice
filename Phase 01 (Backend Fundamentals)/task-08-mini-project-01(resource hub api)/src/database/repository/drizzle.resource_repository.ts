import { resourceSchema } from "../schema/resource.schema.js";

import type { ResourceRepository } from "../../modules/resource/resource.repository.js";
import type {
  ResourceType,
  ResourceResponseType,
  ResponsesType,
} from "../../modules/resource/resource.type.js";
import db from "../connection/db.js";
import { and, count, eq, like, or, sql } from "drizzle-orm";

export class DrizzleResourceRepository implements ResourceRepository {
  async create(
    title: string,
    description: string,
    type: ResourceType,
  ): Promise<ResourceResponseType | null> {
    try {
        
        
      const [result] = await db
        .insert(resourceSchema)
        .values({
          title,
          description,
          type,
          updatedAt : new Date()
        })
        .returning();

      return result ? result : null;
    } catch (err) {
      throw err;
    }
  }

  async getAll(
    limit?: number,
    page?: number,
    search?: string,
  ): Promise<ResponsesType | null> {
    try {
      const pageSize = limit && limit > 0 ? limit : 10;
      const currentPage = page && page > 0 ? page : 1;

      const offset = (currentPage - 1) * pageSize;

      const condition = [
        and(
          search
            ? or(
                like(
                  sql`lower(${resourceSchema.title})`,
                  `%${search.toLowerCase()}%`,
                ),

                like(
                  sql`lower(${resourceSchema.description})`,
                  `%${search.toLowerCase()}%`,
                ),
              )
            : undefined,
        ),
      ];

      const [result] = await db
        .select({ count: count() })
        .from(resourceSchema)
        .where(condition[0]);

      const totalItems = Number(result?.count);

      const totalPages = Math.ceil(Number(totalItems) / pageSize);

      const meta = {
        page: currentPage,
        limit: pageSize,
        totalItems,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      };

      const resources = await db
        .select()
        .from(resourceSchema)
        .where(condition[0])
        .limit(pageSize)
        .offset(offset);

      if (!resources || resources.length === 0) {
        return null;
      }

      return { resources, meta };
    } catch (err) {
      throw err;
    }
  }

  async getSingle(id: string): Promise<ResourceResponseType | null> {
    try {
      const [result] = await db
        .select()
        .from(resourceSchema)
        .where(eq(resourceSchema.id, id));

      return result ? result : null;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, key :string, value : string): Promise<void> {
    
    try {
      await db.update(resourceSchema)
      .set({
        [key] : value,
        updatedAt : new Date()
      })
      .where(eq(resourceSchema.id, id));
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.delete(resourceSchema).where(eq(resourceSchema.id, id));
    } catch (err) {
      throw err;
    }
  }

  async fileUpload(id: string, filePath: any): Promise<void> {
    try {
      await db.update(resourceSchema)
      .set({
        filePath
      }).where(eq(resourceSchema.id, id))
    } catch (err) {
      throw err;
    }
  }
}
