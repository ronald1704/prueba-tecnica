import { genSalt, hash } from "bcryptjs";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { Rol } from "../rol/rol.entity";
import { RoleType } from "../rol/roltype.enum";
import { RolRepository } from "../rol/rol.repository";
import { Usuario } from "../usuario/usuario.entity";
import { SignupDto } from "./dto";

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario>{
    async signup(signupDto: SignupDto) {
        const { nombre, apellido, telefono, correo, contrasenia } = signupDto;
        const usuario = new Usuario();
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.telefono = telefono;
        usuario.correo = correo;

        const rolRepository: RolRepository = await getConnection().getRepository(Rol);
        const defeaultRol: Rol = await rolRepository.findOne({ where: { rol: RoleType.MECANICO } });
        usuario.roles = [defeaultRol];

        const salt = await genSalt(10);
        usuario.contrasenia = await hash(contrasenia, salt);
        await usuario.save();
    }
}