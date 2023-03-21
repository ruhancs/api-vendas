import { Request,Response,NextFunction } from "express";
import Redis from 'ioredis'; //para armazenar os ip das requisiçoes
import { RateLimiterRedis } from "rate-limiter-flexible";
import AppError from "../../errors/AppError";


async function rateLimiter (request:Request,response:Response,next:NextFunction):Promise<void> {
    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS || undefined,
        });
        
        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 5,//numero de requisiçoes por segundo
            duration: 1 // 1 segundo,
        });

        await limiter.consume(request.ip)//informar o ip de quem esta fazendo a requisiçao
        
        return next()
    } catch (err) {
        throw new AppError('Too many requests', 429);
    }
}

export default rateLimiter;