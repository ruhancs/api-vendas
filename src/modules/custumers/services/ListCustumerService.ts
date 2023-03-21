import { getCustomRepository } from "typeorm";
import Custumer from "../typeorm/entities/Custumer";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";


class ListCustumerService {
    public async execute(): Promise<Custumer[]> {
        const custumerRepositoy = getCustomRepository(CustumersRepository);
        const custumers = await custumerRepositoy.find();
        return custumers;
    }
}

export default ListCustumerService;