import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsString()
    contrasenia: string;
}