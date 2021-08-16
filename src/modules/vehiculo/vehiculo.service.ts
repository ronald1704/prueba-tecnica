import { BadRequestException, ConflictException, Injectable, NotFoundException, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Status } from "../../../shared/entity.status.enum";
import { CreateVehiculoDto } from "./dto/create-vehiculo";
import { ReadVehiculoDto } from "./dto/read-vehiculo";
import { UpdateVehiculoDto } from "./dto/update-vehiculo.dto";
import { Vehiculo } from "./vehiculo.entity";
import { VehiculoRepository } from "./vehiculo.repository";
import * as fs from "fs";
import { join, resolve } from "path";
import * as xlsx from "xlsx";
import { CreateVehiculoExcelDto } from "./dto/crearvehiculo-excel.dto";
import path from "path";

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
        let rutaImg;
        const vehiculo: Vehiculo = await this._vehiculoRepository.findOne(idVehiculo, { where: { status: Status.ACTIVO, } });
        if (!vehiculo) {
            throw new NotFoundException();
        }
        rutaImg = "/../../../upload" + vehiculo.imagen;
        return plainToClass(ReadVehiculoDto, vehiculo);
    }

    async getAll(): Promise<ReadVehiculoDto[]> {
        const vehiculos = await this._vehiculoRepository.find({ where: { status: Status.ACTIVO } });

        if (!vehiculos) {
            throw new NotFoundException();
        }

        return vehiculos.map((vehiculo: Vehiculo) => plainToClass(ReadVehiculoDto, vehiculo));

    }

    async createWhithExcel(file: string): Promise<void> {
        let vehiculo = new CreateVehiculoExcelDto;
        //Leer y obtener datos el excel
        const nombreArchivo = file;
        const excel = xlsx.readFile(join(__dirname, `/../../../files/${nombreArchivo}`));
        const hoja = excel.SheetNames;
        const datos = xlsx.utils.sheet_to_json(excel.Sheets[hoja[0]]);

        let dato;
        //Convertir el excel a json
        const jDatos = [];
        for (let jDto in datos) {
            dato = datos[jDto];
            jDatos.push({
                ...dato,
                //Factor para la fecha 
                fechaCreacion: new Date((dato.fechaCreacion - (25567 + 1)) * 86400 * 1000),
                fechaActualizacion: new Date((dato.fechaActualizacion - (25567 + 1)) * 86400 * 1000),
            });
        }
        let saveVehiculo: Vehiculo[] = [];
        //Creando vehiculo con el json
        const allVehiculosAct = await this._vehiculoRepository.find({ where: { status: Status.ACTIVO } });
        const allVehiculosInact = await this._vehiculoRepository.find({ where: { status: Status.INACTIVO } });

        //Vehiculos activos
        for (let i = 0; i < allVehiculosAct.length; i++) {
            for (let dato of jDatos) {
                const { placa } = dato;

                const vehiculoExists = await this._vehiculoRepository.findOne({ where: [{ placa, status: Status.ACTIVO }], });

                if (vehiculoExists && allVehiculosAct[i].placa == dato.placa) {
                    let acumuladoValor = 0;
                    vehiculo.valor = 200000;
                    const Nplaca: string = dato.placa;
                    const fecha: string = dato.fechaCreacion;
                    const color: string = dato.color;
                    console.log(fecha)
                    const optenDia = fecha.toString().split(" ", 3);
                    const dia = parseInt(optenDia[2]);
                    console.log(dia);
                    if (dia % 2 == 0) {
                        acumuladoValor += (200000 * 0.05);
                    }
                    if (parseInt(dato.modelo) <= 1997) {
                        acumuladoValor += (200000 * 0.2);
                    }

                    vehiculo.valor += acumuladoValor;
                    console.log(vehiculo.valor);
                    vehiculo.placa = dato.placa;
                    vehiculo.marca = dato.marca;
                    vehiculo.modelo = dato.modelo;
                    vehiculo.color = dato.color;
                    vehiculo.detalle = dato.detalle;
                    vehiculo.imagen = dato.imagen;
                    vehiculo.status = Status.ACTIVO;
                    vehiculo.fechaCreacion = new Date;
                    vehiculo.fechaActualizacion = dato.fechaActualizacion;
                    if (dato.placa == allVehiculosAct[i].placa) {
                        await this._vehiculoRepository.update(allVehiculosAct[i].id, vehiculo);
                    }
                }
            }
            if (vehiculo.placa != allVehiculosAct[i].placa.toString()) {
                await this._vehiculoRepository.update(allVehiculosAct[i].id, { status: Status.INACTIVO, fechaCreacion: new Date });
            }
        }

        //Vehiculos inactivos
        for (let i = 0; i < allVehiculosInact.length; i++) {
            for (let dato of jDatos) {
                const { placa } = dato;

                const vehiculoExists = await this._vehiculoRepository.findOne({ where: [{ placa, status: Status.ACTIVO }], });

                if (!vehiculoExists && allVehiculosInact[i].placa == dato.placa) {
                    let acumuladoValor = 0;
                    vehiculo.valor = 200000;
                    const Nplaca: string = dato.placa;
                    const fecha: string = dato.fechaCreacion;
                    const color: string = dato.color;
                    console.log(fecha)
                    const optenDia = fecha.toString().split(" ", 3);
                    const dia = parseInt(optenDia[2]);
                    console.log(dia);
                    if (dia % 2 == 0) {
                        acumuladoValor += (200000 * 0.05);
                    }
                    if (parseInt(dato.modelo) <= 1997) {
                        acumuladoValor += (200000 * 0.2);
                    }

                    vehiculo.valor += acumuladoValor;
                    console.log(vehiculo.valor);
                    vehiculo.placa = dato.placa;
                    vehiculo.marca = dato.marca;
                    vehiculo.modelo = dato.modelo;
                    vehiculo.color = dato.color;
                    vehiculo.detalle = dato.detalle;
                    vehiculo.imagen = dato.imagen;
                    vehiculo.status = Status.ACTIVO;
                    vehiculo.fechaCreacion = new Date;
                    vehiculo.fechaActualizacion = dato.fechaActualizacion;
                    if (dato.placa == allVehiculosInact[i].placa) {
                        await this._vehiculoRepository.update(allVehiculosInact[i].id, vehiculo);
                    }
                }
            }
            if (vehiculo.placa != allVehiculosInact[i].placa.toString()) {
                await this._vehiculoRepository.update(allVehiculosInact[i].id, { status: Status.INACTIVO, fechaCreacion: new Date });
            }
        }
        //Crear vehiculos que no estan en la BD
        for (let dato of jDatos) {
            const { placa } = dato;

            const vehiculoExists = await this._vehiculoRepository.findOne({ where: [{ placa, status: Status.ACTIVO }], });

            if (!vehiculoExists) {

                let acumuladoValor = 0;
                vehiculo.valor = 200000;
                const Nplaca: string = dato.placa;
                const fecha: string = dato.fechaCreacion;
                const color: string = dato.color;
                console.log(fecha)
                const optenDia = fecha.toString().split(" ", 3);
                const dia = parseInt(optenDia[2]);
                console.log(dia);
                if (dia % 2 == 0) {
                    acumuladoValor += (200000 * 0.05);
                }
                if (parseInt(dato.modelo) <= 1997) {
                    acumuladoValor += (200000 * 0.2);
                }

                vehiculo.valor += acumuladoValor;
                console.log(vehiculo.valor);
                vehiculo.placa = Nplaca;
                vehiculo.marca = dato.marca;
                vehiculo.modelo = dato.modelo;
                vehiculo.color = dato.color;
                vehiculo.detalle = dato.detalle;
                vehiculo.imagen = dato.imagen;
                vehiculo.fechaCreacion = dato.fechaCreacion;
                vehiculo.fechaActualizacion = dato.fechaActualizacion;
                saveVehiculo.push(this._vehiculoRepository.create(vehiculo));
            }
        }
        await this._vehiculoRepository.save(saveVehiculo);
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
        foundVehiculo.valor = 200000;
        let acumuladoValor: number = 0;
        const dia = foundVehiculo.fechaCreacion.toString().split(" ", 3);
        const valorDia = parseInt(dia[2]);
        if (valorDia % 2 != 0) {
            acumuladoValor += (200000 * 0.05);
        }
        if (parseInt(vehiculo.modelo) <= 1997) {
            acumuladoValor += (200000 * 0.2);
        }
        foundVehiculo.valor += acumuladoValor;

        foundVehiculo.placa = vehiculo.placa;
        foundVehiculo.marca = vehiculo.marca;
        foundVehiculo.modelo = vehiculo.modelo;
        foundVehiculo.color = vehiculo.color;
        foundVehiculo.detalle = vehiculo.detalle;
        foundVehiculo.imagen = vehiculo.imagen;
        foundVehiculo.status = vehiculo.status;
        //foundVehiculo.valor = vehiculo.valor;

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