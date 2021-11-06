import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CosturasdbDataSource} from '../datasources';
import {Trabajador, TrabajadorRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class TrabajadorRepository extends DefaultCrudRepository<
  Trabajador,
  typeof Trabajador.prototype.id,
  TrabajadorRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Trabajador.prototype.id>;

  constructor(
    @inject('datasources.costurasdb') dataSource: CosturasdbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Trabajador, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
