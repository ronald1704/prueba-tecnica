import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Status } from "../../../shared/entity.status.enum";
import { RolRepository } from "../rol/rol.repository";
import { ReadUseruarioDto, UpdateUsuarioDto } from "./dto";
import { Usuario } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioRepository)
        private readonly _usuarioRepository: UsuarioRepository,
        @InjectRepository(RolRepository)
        private readonly _rolRepository: RolRepository
    ) { }

    async get(idUsuario: number): Promise<ReadUseruarioDto> {
        if (!idUsuario) {
            throw new BadRequestException("Debe enviar un ID");
        }

        const usuario: Usuario = await this._usuarioRepository.findOne(idUsuario, { where: { status: Status.ACTIVO } });

        if (!usuario) {
            throw new NotFoundException();
        }

        return plainToClass(ReadUseruarioDto, usuario);
    }

    async getAll(): Promise<ReadUseruarioDto[]> {
        const usuarios = await this._usuarioRepository.find({ where: { status: Status.ACTIVO } });
        if (!usuarios) {
            throw new NotFoundException();
        }

        return usuarios.map((usuarios: Usuario) => plainToClass(ReadUseruarioDto, usuarios))
    }

    async update(idUsuario: number, usuario: UpdateUsuarioDto): Promise<ReadUseruarioDto> {
        const foundUsuario = await this._usuarioRepository.findOne(idUsuario, { where: { status: Status.ACTIVO } });

        if (!foundUsuario) {
            throw new NotFoundException("Usuario no existe!!!");
        }

        foundUsuario.nombre = usuario.nombre;
        const updateUsuario = await this._usuarioRepository.save(foundUsuario);
        return plainToClass(ReadUseruarioDto, updateUsuario);
    }

    async delete(idUsuario: number): Promise<void> {
        const usuarioExist = await this._usuarioRepository.findOne(idUsuario, { where: { status: Status.ACTIVO } });
        if (!usuarioExist) {
            throw new NotFoundException();
        }

        await this._usuarioRepository.update(idUsuario, { status: Status.INACTIVO });
    }

    async setRolToUser(idUsuario: number, idRol: number): Promise<boolean> {
        const usuarioExist = await this._usuarioRepository.findOne(idUsuario, { where: { status: Status.ACTIVO } });

        if (!usuarioExist) {
            throw new NotFoundException();
        }

        const roleExist = await this._rolRepository.findOne(idRol, { where: { status: Status.ACTIVO } });

        if (!roleExist) {
            throw new NotFoundException();
        }

        usuarioExist.roles.push(roleExist);
        await this._usuarioRepository.save(usuarioExist);

        return true;
    }
}