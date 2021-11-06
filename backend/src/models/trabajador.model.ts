import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({settings: {strict: false}})
export class Trabajador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Trabajador>) {
    super(data);
  }
}

export interface TrabajadorRelations {
  // describe navigational properties here
}

export type TrabajadorWithRelations = Trabajador & TrabajadorRelations;
