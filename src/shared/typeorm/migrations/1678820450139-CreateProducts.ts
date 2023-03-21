import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1678820450139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //criar uma tabela
        // executa quando roda o comando  yarn typeorm migration:run
        await queryRunner.createTable(new Table({
            name: 'products',//nome da tabela no db
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'quantity',
                    type: 'int'
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ]
        }))
    }

    // executa quando roda o comando migration reverte
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');//desfazer a tabela criada
    }

}
