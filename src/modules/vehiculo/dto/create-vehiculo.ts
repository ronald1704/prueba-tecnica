import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateVehiculoDto {
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
    readonly imagen: string;

    @IsNumber()
    valor: number;

    @IsDate()
    readonly fechaCreacion: Date;
}