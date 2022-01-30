import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

import Compra from './Compra'
import Artefato from './Artefato';

@Entity('tb_itens_compra')
class ItensCompra {

 @PrimaryColumn('int')
 id: number;
 
 @Column('text')
 quantidade: string;

 @Column('float')
 valor: number;

 //agregacao por composicao
 @ManyToOne(type => Compra)
 @JoinColumn({name: "compra_id", referencedColumnName:"id"})
 compra: Compra;

 //associação
 @ManyToOne(type => Artefato)
 @JoinColumn({name: "artefato_id", referencedColumnName:
    "id"})
    artefato: Artefato;

}

export default ItensCompra;