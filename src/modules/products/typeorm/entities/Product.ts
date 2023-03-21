import { OneToMany,Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "../../../orders/typeorm/entities/OrdersProducts";

// informar o caminho das entities em ormconfig.json 
// "entities": ["./src/modules/**/typeorm/entities/*.ts"],

// para ser uma classe do typeorm precisa ser decorada
@Entity('products')// fara o mapeamento em products
class Product {
// os decorators devem ser abilitados no tsconfig.json
// descomentar "experimentalDecorators": true, "emitDecoratorMetadata": true, "strictPropertyInitialization": true
// "strictPropertyInitialization": false deve ser mudado para false

    @PrimaryGeneratedColumn('uuid')
    id: string;

    //                                   apelido
    @OneToMany(()=> OrdersProducts, order_products => order_products.product)//relaçao entre Order e OrderProducts
    order_products:OrdersProducts[];// 1 order para muitos OrdersProducts

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date; 
}

export default Product;