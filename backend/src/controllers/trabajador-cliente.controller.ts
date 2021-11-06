import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Trabajador,
  Cliente,
} from '../models';
import {TrabajadorRepository} from '../repositories';

export class TrabajadorClienteController {
  constructor(
    @repository(TrabajadorRepository) protected trabajadorRepository: TrabajadorRepository,
  ) { }

  @get('/trabajadors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Trabajador has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.trabajadorRepository.clientes(id).find(filter);
  }

  @post('/trabajadors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Trabajador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Trabajador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInTrabajador',
            exclude: ['id'],
            optional: ['trabajadorId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.trabajadorRepository.clientes(id).create(cliente);
  }

  @patch('/trabajadors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Trabajador.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.trabajadorRepository.clientes(id).patch(cliente, where);
  }

  @del('/trabajadors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Trabajador.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.trabajadorRepository.clientes(id).delete(where);
  }
}
