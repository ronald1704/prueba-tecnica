import { Exclude, Expose, Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { ReadRolDto } from "../../../modules/rol/dto/read-rol.dto";

@Exclude()
export class ReadUseruarioDto {
    @Expose()
    @IsNumber()
    readonly idUsuario: number;

    @Expose()
    @Type(type => ReadRolDto)
    readonly roles: ReadRolDto[];

    @Expose()
    @IsString()
    readonly nombre: string;

    @Expose()
    @IsString()
    readonly apellido: string;

    @Expose()
    @IsString()
    readonly telefono: string;

    @Expose()
    @IsEmail()
    readonly correo: string;
}