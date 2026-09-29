
import { resourceSchema } from "../../database/index.js";
import type { InferInsertModel } from "drizzle-orm";

export type ResourceType = 
"note" | 
"article" | 
"document" | 
"video" | 
"link";


export type ResourceResponseType = InferInsertModel<typeof resourceSchema>

export type metaI = {
    page : number,
    limit : number,
    totalItems : number,
    totalPages : number,
    hasNextPage : boolean,
    hasPrevPage : boolean
}

export type ResponsesType ={
    resources :  ResourceResponseType[] |null,
    meta : metaI
}