import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateVehiculoDto } from "./dto/create-vehiculo";
import { ReadVehiculoDto } from "./dto/read-vehiculo";
import { UpdateVehiculoDto } from "./dto/update-vehiculo.dto";
import { VehiculoService } from "./vehiculo.service";

@Controller("vehiculos")
export class VehiculoController {
    constructor(private readonly _vehiculoService: VehiculoService) { }

    @Get(":idVehiculo")
    get(@Param("idVehiculo", ParseIntPipe) idVehiculo: number): Promise<ReadVehiculoDto> {
        return this._vehiculoService.get(idVehiculo);
    }

    @Get()
    getAll(): Promise<ReadVehiculoDto[]> {
        return this._vehiculoService.getAll();
    }

    @Post("create")
    create(@Body() vehiculo: Partial<CreateVehiculoDto>): Promise<ReadVehiculoDto> {
        return this._vehiculoService.create(vehiculo);
    }

    @Patch(":idVehiculo")
    update(@Param("IdVehiculo", ParseIntPipe) idVehiculo: number, @Body() vehiculo: Partial<UpdateVehiculoDto>): Promise<ReadVehiculoDto> {
        return this._vehiculoService.update(idVehiculo, vehiculo);
    }

    @Delete(":idVehiculo")
    delete(@Param("idVehiculo", ParseIntPipe) idVehiculo: number): Promise<void> {
        return this._vehiculoService.delete(idVehiculo);
    }
}