import { Entity, EntityRepository, Repository } from "typeorm";
import { Vehiculo } from "./vehiculo.entity";

@EntityRepository(Vehiculo)
export class VehiculoRepository extends Repository<Vehiculo>{

}