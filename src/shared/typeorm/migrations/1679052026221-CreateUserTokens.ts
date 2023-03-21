import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1679052026221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'user_tokens',
                columns: [
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary:true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()',
                    },
                    {
                        name:'token',
                        type:'uuid',
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()',
                    },
                    {
                        name:'user_id',
                        type:'uuid',
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
                ],
                foreignKeys: [//foreignKeys de user_id que vem da tabela users
                    {
                        name: 'TokenUser',
                        referencedTableName:'users',
                        referencedColumnNames:['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',//se user for deletado deleta aqui tambem
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_tokens');
    }

}
