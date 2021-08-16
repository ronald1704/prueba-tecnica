import { IsNumber, IsNumberString, IsString } from "class-validator";

export class UpdateVehiculoDto {
    @IsString()
    readonly placa: string;

    @IsString()
    readonly marca: string;

    @IsString()
    readonly modelo: string;

    @IsString()
    readonly color: string;

    @IsString()
    readonly detalle: string;

    @IsString()
    imagen: string;

    @IsString()
    readonly status: string;

    @IsNumber()
    valor: number;
}