import { IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/rol/roltype.enum";

export class UsuarioDto {
    @IsNotEmpty()
    idUsuario: number;

    @IsNotEmpty()
    roles: RoleType[];

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellido: string;

    @IsNotEmpty()
    telefono: string;

    @IsNotEmpty()
    correo: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    fechaCreacion: Date;

    @IsNotEmpty()
    fechaActualizacion: Date;
}