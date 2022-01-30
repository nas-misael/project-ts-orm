import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateItensCompraTable1642814194319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_itens_compra',
            columns: [
            {
            name: 'id',
            type: 'serial',
            isPrimary: true
            },
            {
            name: 'quantidade',
            type: 'varchar(50)',
            isNullable: true,
            default: 0
            },
            {
            name: 'valor',
            type: 'numeric(10,2)',
            isNullable: true,
            default: 0
            },
            {
            name: 'compra_id',
            type: 'int',
            isNullable: false
            },
            {
            name: 'artefato_id',
            type: 'int',
            isNullable: false
            },
            ]
        }));

        await queryRunner.createForeignKey('tb_itens_compra', new TableForeignKey({
            name: 'fk_itensCompra_compra',
            columnNames: ['compra_id'],
            referencedTableName: 'tb_compra',
            referencedColumnNames: ['id']
            })
        );

        await queryRunner.createForeignKey('tb_itens_compra', new TableForeignKey({
            name: 'fk_itensCompra_artefato',
            columnNames: ['artefato_id'],
            referencedTableName: 'tb_artefato',
            referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_itens_compra', "fk_itensCompra_compra");
        await queryRunner.dropForeignKey('tb_itens_compra', "fk_itensCompra_artefato");
        await queryRunner.dropTable('tb_itens_compra'); 
    }

}
