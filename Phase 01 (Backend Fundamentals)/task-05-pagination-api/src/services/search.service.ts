import type { SearchRepository } from "../repositories/search.repository.js";
import type { ProductRes, ProductsTypes } from "../domain/types/search.types.js";

export class SearchService{
    constructor(
       private readonly searchRepository : SearchRepository
    ){}


    async create(name : string, description : string, category : string, price : string){
        try {
            const product = await this
            .searchRepository
            .create(name, description, category, price);

            return product;
        } catch (err) {
            throw err;
        }
    }

    async getProducts(
            search ?:string,
            category ?: string,
            minPrice ?: string,
            maxPrice ?: string,
            page ?: number,
            limit ?: number
        ):Promise<ProductRes | null>{
 
            try {
                const result = await this
            .searchRepository
            .getProducts(
                search,
                category,
                minPrice,
                maxPrice,
                page,
                limit
            )

            if(!result) {
                return null;
            }

            const {products, meta} = result;

            return {products, meta};
            } catch (err) {
                throw err;
            }
        }
}