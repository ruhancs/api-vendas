import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../../config/cache';

class RedisCache {
    private client: RedisClient;
    //verificar se o redis ja esta conectado evitar que crie uma estancia a cada requisiçao
    private connected = false;

    constructor() {
        if(!this.connected) {
            this.client = new Redis(cacheConfig.config.redis);
            this.connected = true;
        }
    }

    // salvar em cache set do redis
    public async save(key:string, value:any):Promise<void> {
        await this.client.set(key,JSON.stringify(value));
    }

    // buscar informaçao em cache
    public async recover<T>(key: string): Promise<T | null>{
        const data = await this.client.get(key);
        if(!data){
            return null;
        }
        const parseData = JSON.parse(data) as T;
        return parseData;
    }

    // excluir dado do cache
    public async invalidade(key: string): Promise<void>{
        await this.client.del(key);
    }
}

// classe ja vai instanciada nao precisa instanciar
export default new RedisCache()
