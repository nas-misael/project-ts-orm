import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import Local from './Local';

@Entity('tb_mapa')
class Mapa {

    @PrimaryColumn('int')
    id: number;

    @Column('text')
    nome: string;

    //agregacao
    @ManyToMany(() => Local)
    @JoinTable({
        name: "tb_mapa_local", joinColumn: {
            name:
                "mapa_id", referencedColumnName: "id"
        }, inverseJoinColumn: {
            name:
                "local_id", referencedColumnName: "id"
        }
    })
    local: Local[];
}

export default Mapa;