import { EntityRepository, Repository } from "typeorm";
import Custumer from "../entities/Custumer";

@EntityRepository(Custumer)
class CustumersRepository extends Repository<Custumer> {
    public async findByname(name:string): Promise<Custumer | undefined>{
        const custumer = await this.findOne({
            where:{
                name,
            },
        });

        return custumer;
    }
    
    public async findById(id:string): Promise<Custumer | undefined>{
        const custumer = await this.findOne({
            where:{
                id,
            },
        });

        return custumer;
    }
    
    public async findByEmail(email:string): Promise<Custumer | undefined>{
        const custumer = await this.findOne({
            where:{
                email,
            },
        });

        return custumer;
    }
}

export default CustumersRepository;