
import type { ProductRes } from "../domain/types/search.types.js"

export interface SearchRepository{

    create(
        name : string,
        description : string,
        category : string,
        price : string
    ):Promise<ProductRes | null>

    getProducts(
        search ?:string,
        category ?: string,
        minPrice ?: string,
        maxPrice ?: string,
        page ?: number,
        limit ?: number
    ):Promise<ProductRes[] | null>
}