import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { createReadStream, fstat } from "fs";
import { diskStorage } from "multer";
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
    update(@Param("IdVehiculo", ParseIntPipe) idVehiculo: number, @Body() vehiculo: Partial<UpdateVehiculoDto>, @UploadedFile() imagen: Express.Multer.File): Promise<ReadVehiculoDto> {
        vehiculo.imagen = imagen.originalname;
        return this._vehiculoService.update(idVehiculo, vehiculo);
    }

    @Delete(":idVehiculo")
    delete(@Param("idVehiculo", ParseIntPipe) idVehiculo: number): Promise<void> {
        return this._vehiculoService.delete(idVehiculo);
    }
}