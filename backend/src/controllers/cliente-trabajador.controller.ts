import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Trabajador,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteTrabajadorController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/trabajador', {
    responses: {
      '200': {
        description: 'Trabajador belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Trabajador)},
          },

        },
      },
    },
  })
  async getTrabajador(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Trabajador> {
    this.getTrabajador;
    return this.clienteRepository.trabajador(id);

  }
}
