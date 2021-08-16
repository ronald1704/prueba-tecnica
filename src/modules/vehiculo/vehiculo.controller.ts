import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, StreamableFile, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { createReadStream, fstat } from "fs";
import { diskStorage } from "multer";
import { Roles } from "../rol/decorators/rol.decorator";
import { RolGuard } from "../rol/guards/rol.guard";
import { CreateVehiculoDto } from "./dto/create-vehiculo";
import { ReadVehiculoDto } from "./dto/read-vehiculo";
import { UpdateVehiculoDto } from "./dto/update-vehiculo.dto";
import { VehiculoService } from "./vehiculo.service";

@Controller("vehiculos")
export class VehiculoController {
    constructor(private readonly _vehiculoService: VehiculoService) { }

    @Get(":idVehiculo")
    @Roles("ADMIN", "MECANICO")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    get(@Param("idVehiculo", ParseIntPipe) idVehiculo: number): Promise<ReadVehiculoDto> {
        return this._vehiculoService.get(idVehiculo);
    }


    @Get()
    @Roles("ADMIN", "MECANICO")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    getAll(): Promise<ReadVehiculoDto[]> {
        return this._vehiculoService.getAll();
    }

    @Post("create")
    @Roles("ADMIN", "MECANICO")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @UseInterceptors(
        FileInterceptor('imagen', {
            storage: diskStorage({
                destination: './upload',
                filename: (req, file, cd) => {
                    cd(null, file.originalname);
                },
            }),
        }),
    )
    create(@Body() vehiculo: Partial<CreateVehiculoDto>, @UploadedFile() imagen: Express.Multer.File): Promise<ReadVehiculoDto> {
        vehiculo.imagen = imagen.originalname;
        return this._vehiculoService.create(vehiculo);
    }

    @Post("createexcel")
    @Roles("ADMIN", "MECANICO")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @HttpCode(203)
    @UseInterceptors(
        FileInterceptor('archivo', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, cd) => {
                    cd(null, file.originalname);
                },
            }),
        }),
    )
    createWhithExcel(@UploadedFile() file: Express.Multer.File) {
        return this._vehiculoService.createWhithExcel(file.originalname);
    }

    @Patch(":idVehiculo")
    @Roles("ADMIN", "MECANICO")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @UseInterceptors(
        FileInterceptor('imagen', {
            storage: diskStorage({
                destination: './upload',
                filename: (req, file, cd) => {
                    cd(null, file.originalname);
                },
            }),
        }),
    )
    update(@Param("idVehiculo", ParseIntPipe) idVehiculo: number, @Body() vehiculo: Partial<UpdateVehiculoDto>, @UploadedFile() imagen: Express.Multer.File): Promise<ReadVehiculoDto> {
        vehiculo.imagen = imagen.originalname;
        return this._vehiculoService.update(idVehiculo, vehiculo);
    }

    @Delete(":idVehiculo")
    @Roles("ADMIN", "MECANICO")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    delete(@Param("idVehiculo", ParseIntPipe) idVehiculo: number): Promise<void> {
        return this._vehiculoService.delete(idVehiculo);
    }
}