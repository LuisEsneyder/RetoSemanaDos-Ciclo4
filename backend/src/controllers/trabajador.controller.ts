import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Trabajador} from '../models';
import {TrabajadorRepository} from '../repositories';

export class TrabajadorController {
  constructor(
    @repository(TrabajadorRepository)
    public trabajadorRepository : TrabajadorRepository,
  ) {}

  @post('/trabajadors')
  @response(200, {
    description: 'Trabajador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Trabajador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabajador, {
            title: 'NewTrabajador',
            exclude: ['id'],
          }),
        },
      },
    })
    trabajador: Omit<Trabajador, 'id'>,
  ): Promise<Trabajador> {
    return this.trabajadorRepository.create(trabajador);
  }

  @get('/trabajadors/count')
  @response(200, {
    description: 'Trabajador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Trabajador) where?: Where<Trabajador>,
  ): Promise<Count> {
    return this.trabajadorRepository.count(where);
  }

  @get('/trabajadors')
  @response(200, {
    description: 'Array of Trabajador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Trabajador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Trabajador) filter?: Filter<Trabajador>,
  ): Promise<Trabajador[]> {
    return this.trabajadorRepository.find(filter);
  }

  @patch('/trabajadors')
  @response(200, {
    description: 'Trabajador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabajador, {partial: true}),
        },
      },
    })
    trabajador: Trabajador,
    @param.where(Trabajador) where?: Where<Trabajador>,
  ): Promise<Count> {
    return this.trabajadorRepository.updateAll(trabajador, where);
  }

  @get('/trabajadors/{id}')
  @response(200, {
    description: 'Trabajador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Trabajador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Trabajador, {exclude: 'where'}) filter?: FilterExcludingWhere<Trabajador>
  ): Promise<Trabajador> {
    return this.trabajadorRepository.findById(id, filter);
  }

  @patch('/trabajadors/{id}')
  @response(204, {
    description: 'Trabajador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabajador, {partial: true}),
        },
      },
    })
    trabajador: Trabajador,
  ): Promise<void> {
    await this.trabajadorRepository.updateById(id, trabajador);
  }

  @put('/trabajadors/{id}')
  @response(204, {
    description: 'Trabajador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() trabajador: Trabajador,
  ): Promise<void> {
    await this.trabajadorRepository.replaceById(id, trabajador);
  }

  @del('/trabajadors/{id}')
  @response(204, {
    description: 'Trabajador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.trabajadorRepository.deleteById(id);
  }
}
