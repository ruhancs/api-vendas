import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1679138852278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',//inserir o customer id a tabela de order como uma coluna
            new TableColumn({
                name:'customer_id',
                type:'uuid',
                isNullable:true,
            })
        );
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersCustomer',//nome da chave estrangeira, nome da foreignKey
                columnNames: ['customer_id'],//nome da coluna que se relaciona com a tabela de customers
                referencedTableName: 'custumers',//nome da tabela que contem oque se quer utilizar
                referencedColumnNames: ['id'],// coluna que sera usada na referencia
                onDelete: 'SET NULL'//ao deletar na outra tabela inseri a referencia como nulo
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
        await queryRunner.dropColumn('orders', 'customer_id');
    }

}
