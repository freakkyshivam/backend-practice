import { and, eq, gte, like, lte, or, sql, count } from "drizzle-orm";
import type {
  ProductRes,
  ProductsTypes,
} from "../../domain/types/search.types.js";
import type { SearchRepository } from "../../repositories/search.repository.js";
import db from "../connection/db.js";
import { productSchema } from "../schema/product.schema.js";

export class SearchDrizzleRepository implements SearchRepository {
  async create(
    name: string,
    description: string,
    category: string,
    price: string,
  ): Promise<ProductsTypes | null> {
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
  ): Promise<ProductRes | null> {
    try {
      const pageSize = limit && limit > 0 ? limit : 10;
      const currentPage = page && page > 0 ? page : 1;

      const offset = (currentPage - 1) * pageSize;

      const condition = [
        and(
          category
            ? eq(sql`lower(${productSchema.category})`, category.toLowerCase())
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
          minPrice ? gte(productSchema.price, minPrice) : undefined,
          maxPrice ? lte(productSchema.price, maxPrice) : undefined,
        ),
      ];

      const [result] = await db
        .select({ count: count() })
        .from(productSchema)
        .where(condition[0]);

      const totalItems = Number(result?.count);

      const totalPages = Math.ceil(Number(totalItems) / pageSize);

      const meta = {
        page: currentPage,
        limit: pageSize,
        totalItems,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };

      const products = await db
        .select()
        .from(productSchema)
        .where(condition[0])
        .limit(pageSize)
        .offset(offset);

      if (!products || products.length === 0) {
        return null;
      }

      return { products, meta };
    } catch (err) {
      throw err;
    }
  }
}
