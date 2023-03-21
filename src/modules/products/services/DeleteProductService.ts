import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/errors/AppError";
import redisCache from "../../../shared/cache/RedisCache";

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({id}:IRequest): Promise<void> {
// para utilizar o ProductRepository que foi customizada
        const productsRepository = getCustomRepository(ProductRepository);

        const product =await productsRepository.findOne(id);

        if(!product){
            throw new AppError('product not found');
        }

        // deletar dados do cache quando um novo produto e criado para armaznar todos novamente
        redisCache.invalidade('api-vendas-products');

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;