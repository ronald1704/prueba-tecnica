import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Status } from "../../../shared/entity.status.enum";
import { CreateVehiculoDto } from "./dto/create-vehiculo";
import { ReadVehiculoDto } from "./dto/read-vehiculo";
import { UpdateVehiculoDto } from "./dto/update-vehiculo.dto";
import { Vehiculo } from "./vehiculo.entity";
import { VehiculoRepository } from "./vehiculo.repository";

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(VehiculoRepository)
        private readonly _vehiculoRepository: VehiculoRepository
    ) { }

    async get(idVehiculo: number): Promise<ReadVehiculoDto> {
        if (!idVehiculo) {
            throw new BadRequestException("Debe enviar un Id");
        }
        const vehiculo: Vehiculo = await this._vehiculoRepository.findOne(idVehiculo, { where: { status: Status.ACTIVO } });
        if (!vehiculo) {
            throw new NotFoundException();
        }
        return plainToClass(ReadVehiculoDto, vehiculo);
    }

    async getAll(): Promise<ReadVehiculoDto[]> {
        const vehiculos = await this._vehiculoRepository.find({ where: { status: Status.ACTIVO } });

        if (!vehiculos) {
            throw new NotFoundException();
        }

        return vehiculos.map((vehiculo: Vehiculo) => plainToClass(ReadVehiculoDto, vehiculo));

    }

    async create(vehiculo: Partial<CreateVehiculoDto>): Promise<ReadVehiculoDto> {
        const { placa } = vehiculo;
        vehiculo.valor = 200000;
        let acumuladoValor: number = 0;
        const vehiculoExists = await this._vehiculoRepository.findOne({ where: [{ placa, status: Status.ACTIVO }], });
        if (vehiculoExists) {
            throw new ConflictException("Ya este auto existe y está activo!!!");
        }
        const primerSave: Vehiculo = await this._vehiculoRepository.save(vehiculo);
        const dia = vehiculo.fechaCreacion.toString().split(" ", 3);
        const valorDia = parseInt(dia[2]);
        if (valorDia % 2 != 0) {
            acumuladoValor += (200000 * 0.05);
        }
        if (parseInt(vehiculo.modelo) <= 1997) {
            acumuladoValor += (200000 * 0.2);
        }

        vehiculo.valor += acumuladoValor;

        const segundoSave: Vehiculo = await this._vehiculoRepository.save(vehiculo);
        return plainToClass(ReadVehiculoDto, segundoSave);
    }

    async update(idVehiculo: number, vehiculo: Partial<UpdateVehiculoDto>): Promise<ReadVehiculoDto> {
        const foundVehiculo: Vehiculo = await this._vehiculoRepository.findOne(idVehiculo, { where: { status: Status.ACTIVO } });

        if (!foundVehiculo) {
            throw new NotFoundException();
        }

        foundVehiculo.placa = vehiculo.placa;
        foundVehiculo.marca = vehiculo.marca;
        foundVehiculo.modelo = vehiculo.modelo;
        foundVehiculo.color = vehiculo.color;
        foundVehiculo.detalle = vehiculo.detalle;
        foundVehiculo.imagen = vehiculo.imagen;
        foundVehiculo.valor = vehiculo.valor;

        const updateVehiculo: Vehiculo = await this._vehiculoRepository.save(foundVehiculo);
        return plainToClass(ReadVehiculoDto, updateVehiculo);
    }

    async delete(idVehiculo: number): Promise<void> {
        const vehiculoExists = await this._vehiculoRepository.findOne(idVehiculo, { where: { status: Status.ACTIVO } });
        if (!vehiculoExists) {
            throw new NotFoundException();
        }

        await this._vehiculoRepository.update(idVehiculo, { status: Status.INACTIVO });
    }
}