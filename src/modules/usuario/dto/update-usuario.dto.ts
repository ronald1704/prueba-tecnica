import { IsEmail, IsString } from "class-validator";

export class UpdateUsuarioDto {
    @IsString()
    readonly nombre: string;

    @IsString()
    readonly apellido: string;

    @IsString()
    readonly telefono: string;

    @IsEmail()
    readonly correo: string;
}