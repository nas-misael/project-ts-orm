import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('tb_local')
class Local {

 @PrimaryColumn('int')
 id: number;
 
 @Column('text')
 nome: string;

 @Column('text')
 latitude: string;

 @Column('text')
 longitude: string;
};

export default Local;