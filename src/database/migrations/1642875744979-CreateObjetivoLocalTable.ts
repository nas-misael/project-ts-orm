import {MigrationInterface, QueryRunner, TableForeignKey, Table} from "typeorm";

export class CreateObjetivoLocalTable1642875744979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_objetivo_local',
            columns: [
                {
                    name: 'objetivo_id',
                    type: 'serial',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'local_id',
                    type: 'serial',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }))

        await queryRunner.createForeignKey(
            'tb_objetivo_local',
            new TableForeignKey({
                name: 'fk_objetivo_local_l',
                columnNames: ['local_id'],
                referencedTableName: 'tb_local',
                referencedColumnNames: ['id']
            })
        );

        await queryRunner.createForeignKey(
            'tb_objetivo_local',
            new TableForeignKey({
                name: 'fk_objetivo_local_o',
                columnNames: ['objetivo_id'],
                referencedTableName: 'tb_objetivo',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_objetivo_local', "fk_objetivo_local_l");
        await queryRunner.dropForeignKey('tb_objetivo_local', "fk_objetivo_local_o");
        await queryRunner.dropTable('tb_objetivo_local');
    }

}
