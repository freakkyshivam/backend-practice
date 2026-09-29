import type { ResourceType, ResourceResponseType, ResponsesType } from "./resource.type.js"

export interface ResourceRepository{

    create(
        title : string,
        description : string,
        type : ResourceType
    ) : Promise<ResourceResponseType | null>;

    getAll(
        limit ?: number,
        page ?: number,
        search ?: string
    ) : Promise<ResponsesType | null>;

    getSingle(
        id : string
    ) : Promise<ResourceResponseType | null>;

    update(
        id : string,
        key : string,
        value : string,
    ) : Promise<void>

    delete(
        id : string
    ) : Promise<void>

    fileUpload(
        id : string,
        filePath : any
    ):Promise<void>
}