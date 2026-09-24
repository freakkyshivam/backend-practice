import { and, eq, gt, like, lt, or, sql } from "drizzle-orm";
import type { ProductRes } from "../../domain/types/search.types.js";
import type { SearchRepository } from "../../repositories/search.repository.js";
import db from "../connection/db.js";
import { productSchema } from "../schema/product.schema.js";

export class SearchDrizzleRepository implements SearchRepository {
  async create(
    name: string,
    description: string,
    category: string,
    price: string,
  ): Promise<ProductRes | null> {
    const [product] = await db
      .insert(productSchema)
      .values({
        name,
        description,
        category,
        price,
      })
      .returning();

    return product ? product : null;
  }

  async getProducts(
    search?: string,
    category?: string,
    minPrice?: string,
    maxPrice?: string,
    page?: number,
    limit?: number,
  ): Promise<ProductRes[] | null> {
    try {
      const pageSize = limit && limit > 0 ? limit : 10;
      const currentPage = page && page > 0 ? page : 1;

      const offset = (currentPage - 1) * pageSize;

      const products = await db
        .select()
        .from(productSchema)
        .where(
          and(
            category
              ? eq(
                  sql`lower(${productSchema.category})`,
                  category.toLowerCase(),
                )
              : undefined,
            search
              ? or(
                  like(
                    sql`lower(${productSchema.name})`,
                    `%${search.toLowerCase()}%`,
                  ),
                  like(
                    sql`lower(${productSchema.description})`,
                    `%${search.toLowerCase()}%`,
                  ),
                )
              : undefined,
            minPrice ? gt(productSchema.price, minPrice) : undefined,
            maxPrice ? lt(productSchema.price, maxPrice) : undefined,
          ),
        )
        .limit(pageSize)
        .offset(
           offset
        );

      if (!products || products.length === 0) {
        return null;
      }

      return products;
    } catch (err) {
      throw err;
    }
  }
}
