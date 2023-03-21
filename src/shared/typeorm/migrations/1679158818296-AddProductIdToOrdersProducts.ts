import {MigrationInterface, QueryRunner,TableColumn,TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProducts1679158818296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_products',//inserir o customer id a tabela de order como uma coluna
            new TableColumn({
                name:'product_id',
                type:'uuid',
                isNullable:true,
            })
        );
        await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
                name: 'OrdersProductsProduct',//nome da chave estrangeira, nome da foreignKey
                columnNames: ['product_id'],//nome da coluna que se relaciona com a tabela de customers
                referencedTableName: 'products',//nome da tabela que contem oque se quer utilizar
                referencedColumnNames: ['id'],// coluna que sera usada na referencia
                onDelete: 'SET NULL'//ao deletar na outra tabela inseri a referencia como nulo
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_product', 'OrdersProductsProduct');
        await queryRunner.dropColumn('orders_products', 'product_id');
    }

}
