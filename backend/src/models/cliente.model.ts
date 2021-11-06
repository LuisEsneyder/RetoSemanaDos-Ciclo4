import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Trabajador} from './trabajador.model';

@model()
export class Cliente extends Entity {
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
    type: 'number',
    required: true,
  })
  medidaEspalda: number;

  @property({
    type: 'number',
    required: true,
  })
  medidaHombro: number;

  @property({
    type: 'number',
    required: true,
  })
  medidaPecho: number;

  @property({
    type: 'number',
    required: true,
  })
  medidaAlto: number;

  @belongsTo(() => Trabajador)
  trabajadorId: string;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
