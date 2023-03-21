import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Custumer from "../typeorm/entities/Custumer";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";


interface IRequest {
    name: string;
    email: string;
}

class CreateCustumerService {
    public async execute({name,email}:IRequest): Promise<Custumer> {
        const custumersRepository = getCustomRepository(CustumersRepository);
        const emailExists = await custumersRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError("email already in use");
        }
        const custumer = custumersRepository.create({
            name,
            email,
        });
        await custumersRepository.save(custumer);
        return custumer;
    }
}

export default CreateCustumerService;