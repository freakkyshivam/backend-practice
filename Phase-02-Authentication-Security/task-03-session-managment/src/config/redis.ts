import {Redis} from 'ioredis'
import { env } from './env.js'
import { logger } from './logger.js'

export const redis = new Redis({
    host : env.redis.host,
    port : env.redis.port,
    password : env.redis.password
})


redis.on('connect', ()=>{
     logger.info("Redis connected")
})

redis.on('error', (err)=>{
   logger.error({errName : err.name, message : err.message, stack : err.stack, cause : err.cause}, "Redis connection error") 
})