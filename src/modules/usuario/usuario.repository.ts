import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "./usuario.entity";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario>{

}