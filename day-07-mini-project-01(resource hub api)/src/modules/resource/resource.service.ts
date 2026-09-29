import type { ResourceRepository } from "../resource/resource.repository.js";
import type { ResourceResponseType, ResourceType, ResponsesType } from "./resource.type.js";

export class ResourceServie {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  // create resource
   create = async(
    title : string, 
    description : string , 
    type : ResourceType
) : Promise<ResourceResponseType | null> =>{
    try {
        
        const result = await this.resourceRepository.create(
            title,
            description,
            type
        )

        return result;
    } catch (err) {
        throw err;
    }
  }

  // get all resource
  getAll = async(
    limit ?: number,
    page ?: number,
    search ?: string
  ) : Promise<ResponsesType | null> =>{

    try {
        const result = await this.resourceRepository.getAll(
            limit,
            page,
            search
        );

        return result;
    } catch (err) {
        throw err;
    }
  }

  // get single resource

  getSingle = async(
    id : string
  ) : Promise<ResourceResponseType | null> =>{
    try {
        const result = await this.resourceRepository.getSingle(id);

        return result;
    } catch (err) {
        throw err;
    }
  }

  //update resource

  update = async(
    id : string,
    key : string,
    value : string
  ) : Promise<void> =>{
    try {
        await this.resourceRepository.update(id, key, value);
    } catch (err) {
        throw err;
    }
  }

  // delete resource
  delete = async(
    id : string
  ) : Promise<void> =>{
    try {
        await this.resourceRepository.delete(id);
    } catch (err) {
        throw err;
    }
  }

  // file upload
  fileUpload = async(
    id : string,
    filePath : any
  ) : Promise<void> =>{
    try {
        await this.resourceRepository.fileUpload(
            id,
            filePath
        )
    } catch (err) {
        throw err;
    }
  }
}
