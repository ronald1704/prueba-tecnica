import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadVehiculoDto {
    @Expose()
    @IsString()
    readonly placa: string;

    @Expose()
    @IsString()
    readonly marca: string;

    @Expose()
    @IsString()
    readonly modelo: string;

    @Expose()
    @IsString()
    readonly color: string;

    @Expose()
    @IsString()
    readonly detalle: string;

    @Expose()
    @IsString()
    readonly imagen: string;

    @Expose()
    @IsNumber()
    readonly valor: number;
}