import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateVehiculoExcelDto {
    @IsString()
    placa: string;

    @IsString()
    marca: string;

    @IsString()
    modelo: string;

    @IsString()
    color: string;

    @IsString()
    detalle: string;

    @IsString()
    imagen: string;

    @IsNumber()
    valor: number;

    @IsDate()
    fechaCreacion: Date;

    @IsDate()
    fechaActualizacion: Date;
}