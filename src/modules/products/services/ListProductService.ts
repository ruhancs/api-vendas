import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import redisCache from "../../../shared/cache/RedisCache";


class ListProductService {
    public async execute(): Promise<Product[]> {
// para utilizar o ProductRepository que foi customizada
        const productsRepository = getCustomRepository(ProductRepository);

        // pegar os produtos que estao armazenados em cache
        let products = await redisCache.recover<Product[]>('api-vendas-products');

        // se nao tiver products armazenados em cache busca no db e armazena em cache
        if(!products) {
            products = await productsRepository.find();
            // armazenar informaçao em cache
            await redisCache.save('api-vendas-products', products);
        }
        
        return products;
    }
}

export default ListProductService;