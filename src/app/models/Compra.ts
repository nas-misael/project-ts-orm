import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

import Jogador from './Jogador';
import ItensCompra from './ItensCompra'

@Entity('tb_compra')
class Compra {

 @PrimaryColumn('int')
 id: number;
 
 @Column('timestamp')
 data: Date;

 @Column('float')
 total: number;

 //agregacao por composicao: OneToMany do Jogador referencia esse atributo.
 @ManyToOne(type => Jogador)
 @JoinColumn({name: "jogador_nickname", referencedColumnName:"nickname"})
 jogador: Jogador;

 //Itens Compra
 @OneToMany(() => ItensCompra, itensCompra => itensCompra.compra)
 itensCompra: ItensCompra[];
 
}


export default Compra;