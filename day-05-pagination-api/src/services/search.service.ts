import type { SearchRepository } from "../repositories/search.repository.js";
import type { ProductRes } from "../domain/types/search.types.js";

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
        ):Promise<ProductRes[] | null>{

            console.log(typeof(page));
            console.log(typeof(limit));
            

            try {
                const products = await this
            .searchRepository
            .getProducts(
                search,
                category,
                minPrice,
                maxPrice
            )

            return products;
            } catch (err) {
                throw err;
            }
        }
}