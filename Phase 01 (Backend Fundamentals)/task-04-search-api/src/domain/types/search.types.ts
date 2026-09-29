import type { InferSelectModel } from "drizzle-orm";
import { productSchema } from "../../database/index.js";

export type ProductRes = InferSelectModel<typeof productSchema>;