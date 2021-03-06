import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMapaLocalTable1642875726134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_mapa_local',
            columns: [
                {
                    name: 'mapa_id',
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
            'tb_mapa_local',
            new TableForeignKey({
                name: 'fk_mapa_local_l',
                columnNames: ['local_id'],
                referencedTableName: 'tb_local',
                referencedColumnNames: ['id']
            })
        );

        await queryRunner.createForeignKey(
            'tb_mapa_local',
            new TableForeignKey({
                name: 'fk_mapa_local_m',
                columnNames: ['mapa_id'],
                referencedTableName: 'tb_mapa',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_mapa_local', "fk_mapa_local_l");
        await queryRunner.dropForeignKey('tb_mapa_local', "fk_mapa_local_m");
        await queryRunner.dropTable('tb_mapa_local');
    }

}
