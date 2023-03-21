import { Column,CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "../../../products/typeorm/entities/Product";
import Order from "./Order";

@Entity('orders_products')
class OrdersProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    
    @ManyToOne(() => Order, order => order.order_products)//informa com qual campo da tabela Order sera relacionado
    @JoinColumn({name: 'order_id'})//coluna que faz a junçao
    order: Order;// muitos ordersProducts para 1 order

    @ManyToOne(() => Product, product => product.order_products)//informa com qual campo da tabela Order sera relacionado
    @JoinColumn({name: 'product_id'})//coluna que faz a junçao
    product: Product;// muitos ordersProducts para 1 order

    @Column('decimal')
    order_id: string;
    
    @Column('decimal')
    product_id: string;
    
    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at:Date;
    
    @CreateDateColumn()
    updated_at:Date;

}

export default OrdersProducts;