
import z from 'zod';

export const createProductValidator = z.object({
  
    name : z.string("name").min(1),
    description : z.string("name").min(1),
    category : z.string("name").min(1),
    price : z.coerce.number().min(0)
})