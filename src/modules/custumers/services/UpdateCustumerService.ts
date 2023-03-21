import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Custumer from "../typeorm/entities/Custumer";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustumerService {
    public async execute({id,name,email}:IRequest): Promise<Custumer> {
        const custumersRepository = getCustomRepository(CustumersRepository);
        const custumer = await custumersRepository.findById(id);
        if(!custumer){
            throw new AppError('Custumer not found')
        }
        
        const custumerEmailExist = await custumersRepository.findByEmail(email);
        if(custumerEmailExist && email !== custumer.email){
            throw new AppError('This email is already in use');
        }

        custumer.name=name;
        custumer.email=email;

        await custumersRepository.save(custumer);

        return custumer;
    }
}

export default UpdateCustumerService;