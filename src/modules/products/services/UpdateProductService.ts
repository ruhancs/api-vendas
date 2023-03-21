import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import redisCache from "../../../shared/cache/RedisCache";

interface IRequest {
    id: string
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({id,name,price,quantity}:IRequest): Promise<Product> {
// para utilizar o ProductRepository que foi customizada
        const productsRepository = getCustomRepository(ProductRepository);
        // verficar se ja existe produtos com o mesmo nome
        const product =await productsRepository.findOne(id)

        if(!product){
            throw new AppError('product not found');
        }

        // verficar se ja existe produtos com o mesmo nome
        const productExists =await productsRepository.findByName(name);
        if (productExists && name !== product.name) {
            throw new AppError('product name already exist')
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        // deletar dados do cache quando um novo produto e criado para armaznar todos novamente
        redisCache.invalidade('api-vendas-products');

        await productsRepository.save(product);

      return product;
    }
}

export default UpdateProductService;