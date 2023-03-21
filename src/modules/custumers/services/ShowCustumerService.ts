import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Custumer from "../typeorm/entities/Custumer";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

interface IRequest {
    id: string;
}

class ShowCustumerService {
    public async execute({id}:IRequest): Promise<Custumer> {
        const custumersRepository = getCustomRepository(CustumersRepository);
        const custumer = await custumersRepository.findById(id);
        if(!custumer){
            throw new AppError('Custumer not found')
        }
        return custumer;
    }
}

export default ShowCustumerService;