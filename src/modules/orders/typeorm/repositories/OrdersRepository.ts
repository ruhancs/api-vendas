import { EntityRepository, Repository } from "typeorm";
import Custumer from "../../../custumers/typeorm/entities/Custumer";
import Order from "../entities/Order";

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Custumer;
    products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
    
    // criar metodo de busca por nome personalizado para o typeorm
    public async findById(id:string): Promise<Order | undefined> {
        const order = this.findOne(id, {
            relations: ['order_products','customer']// inserir os dados das tabelas relacionadas
        });
        return order;
    }

    public async createOrder({ customer,products }:IRequest): Promise<Order> {
        const order = this.create({
            customer,
            order_products: products
        });

        await this.save(order);
        return order
    }
}