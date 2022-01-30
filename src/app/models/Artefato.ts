import {Entity, Column, PrimaryColumn, TableInheritance} from 'typeorm';

@Entity('tb_artefato')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Artefato {

 @PrimaryColumn('int')
 id: number;

 @Column('text')
 nome: string;

 @Column('float')
 peso: number;

 @Column('float')
 valor: number;

}