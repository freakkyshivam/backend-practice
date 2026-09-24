import type { SearchService } from "../services/search.service.js";

import type { Request, Response } from "express";

import { createProductValidator } from "../validator/search.validator.js";

export class SearchController{
    constructor(
        private readonly searchService : SearchService
    ){}

    create = async (req : Request, res : Response)=>{
        try {
            
            const validationResult = createProductValidator.safeParse(req.body);

            if(!validationResult.success){
                return res.status(400).json({
                    success : false,
                    msg : validationResult.error.flatten().fieldErrors,
                    data : []
                })
            }
            const {name, description, category, price} = req.body;

            const product = await this
            .searchService
            .create(name, description, category, price);

            return res.status(201).json({
                success : true,
                msg : "Product created",
                data : product      
            })
        } catch (err) {
             return res.status(500).json({
                success : false,
                msg : err instanceof Error ? err.message : "Somthing went wrong",
                data : []
            })
        }
    }

    getProducts = async (req : Request, res : Response)=>{
        try {
            const {search, category, minPrice, maxPrice,page, limit} = req.query;

            console.log(search);
            console.log(category);
            console.log(minPrice);
            console.log(maxPrice);
            console.log(page);
            console.log(limit);
            

            const products = await this.searchService.getProducts(
                search as string,
                category as string,
                minPrice as string,
                maxPrice as string,
                Number(page),
                Number(limit)
            )

            if(!products || products.length === 0){
                return res.status(404).json({
                    success : false,
                    msg : "No product found",
                    data : []
                })
            }

            return res.status(200).json({
                success : true,
                msg : "Products found",
                data : products
            })
        } catch (err) {
            return res.status(500).json({
                success : false,
                msg : err instanceof Error ? err.message : "Somthing went wrong",
                data : []
            })
        }
    }
}