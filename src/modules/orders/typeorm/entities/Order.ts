import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Custumer from "../../../custumers/typeorm/entities/Custumer";
import OrdersProducts from "./OrdersProducts";


@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // chave estrangeira foreignKey custumer
    @ManyToOne(() => Custumer)//muitas orders para 1 cliente
    @JoinColumn({name: 'customer_id'})//coluna que faz a junçao criada entiti AddCustomerIdToOrders
    customer: Custumer;// 1 cliente para cada order
//                                   apelido
    @OneToMany(()=> OrdersProducts, order_products => order_products.order,{
        cascade:true // cada vez que criar uma order todos orders_products serao salvos
    })//relaçao entre Order e OrderProducts
    order_products:OrdersProducts[];// 1 order para muitos OrdersProducts

    @CreateDateColumn()
    created_at:Date;
    
    @CreateDateColumn()
    updated_at:Date;

}

export default Order;