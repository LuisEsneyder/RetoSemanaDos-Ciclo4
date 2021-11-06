import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CosturasdbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Trabajador} from '../models';
import {TrabajadorRepository} from './trabajador.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly trabajador: BelongsToAccessor<Trabajador, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.costurasdb') dataSource: CosturasdbDataSource, @repository.getter('TrabajadorRepository') protected trabajadorRepositoryGetter: Getter<TrabajadorRepository>,
  ) {
    super(Cliente, dataSource);
    this.trabajador = this.createBelongsToAccessorFor('trabajador', trabajadorRepositoryGetter,);
    this.registerInclusionResolver('trabajador', this.trabajador.inclusionResolver);
  }
}
