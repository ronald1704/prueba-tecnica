import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { timeStamp } from "console";
import { getConnection } from 'typeorm';
import { Status } from "../../../shared/entity.status.enum";
import { CreateRolDto, ReadRolDto, UpdateRolDto } from "./dto";
import { Rol } from "./rol.entity";
import { RolRepository } from "./rol.repository";

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolRepository)
        private readonly _rolRepository: RolRepository
    ) { }

    async get(id: number): Promise<ReadRolDto> {
        if (!id) {
            throw new BadRequestException("Debe enviar un id!!!");
        }

        const rol: Rol = await this._rolRepository.findOne(id, { where: { status: Status.ACTIVO } });

        if (!rol) {
            throw new NotFoundException();
        }

        return plainToClass(ReadRolDto, rol);
    }

    async getAll(): Promise<ReadRolDto[]> {
        const roles = await this._rolRepository.find({ where: { status: Status.ACTIVO } });

        if (!roles) {
            throw new NotFoundException();
        }

        return roles.map((rol: Rol) => plainToClass(ReadRolDto, rol));
    }

    async create(rol: Partial<CreateRolDto>): Promise<ReadRolDto> {
        const savedRol: Rol = await this._rolRepository.save(rol);
        return plainToClass(ReadRolDto, savedRol);
    }

    async update(idRol: number, rol: Partial<UpdateRolDto>): Promise<ReadRolDto> {
        const foundRol: Rol = await this._rolRepository.findOne(idRol, { where: { status: Status.ACTIVO } });
        if (!foundRol) {
            throw new NotFoundException();
        }
        foundRol.rol = rol.rol;

        const updatedRol: Rol = await this._rolRepository.save(foundRol);
        return plainToClass(ReadRolDto, updatedRol);
    }

    async delete(idRol: number): Promise<void> {
        const rolExists = await this._rolRepository.findOne(idRol, { where: { status: Status.ACTIVO } });
        if (!rolExists) {
            throw new NotFoundException();
        }

        await this._rolRepository.update(idRol, { status: Status.INACTIVO });
    }
}