import {Entity, Column, PrimaryColumn, ChildEntity} from 'typeorm';
import Artefato from './Artefato';
import { Calibre } from './Calibre';
@ChildEntity()
export default class Municao extends Artefato{
 @Column('boolean')
 explosiva: boolean;
 @Column({
    type: "enum",
    enum: Calibre,
     })
     calibre: Calibre;
}