import type { InferSelectModel } from "drizzle-orm";
import { productSchema } from "../../database/index.js";

export type ProductsTypes = InferSelectModel<typeof productSchema>;

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ProductRes = {
  products: ProductsTypes[] | null;
  meta: PaginationMeta;
};