import { IsNumber, IsString } from "class-validator";

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
    readonly imagen: string;

    @IsNumber()
    readonly valor: number;
}