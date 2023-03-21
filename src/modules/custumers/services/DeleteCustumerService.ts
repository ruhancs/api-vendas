import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

interface IRequest {
    id: string;
}

class DeleteCustumerService {
    public async execute({id}:IRequest): Promise<void> {
        const custumersRepository = getCustomRepository(CustumersRepository);
        const custumer = await custumersRepository.findById(id);
        if(!custumer){
            throw new AppError('Custumer not found')
        }
        await custumersRepository.remove(custumer);
    }
}

export default DeleteCustumerService;