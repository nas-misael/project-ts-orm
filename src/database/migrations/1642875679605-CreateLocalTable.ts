import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLocalTable1642875679605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_local',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar(50)',
                    isNullable: false
                },
                {
                    name: 'latitude',
                    type: 'varchar(50)',
                    isNullable: true
                },
                {
                    name: 'longitude',
                    type: 'varchar(50)',
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_local');
    }

}
