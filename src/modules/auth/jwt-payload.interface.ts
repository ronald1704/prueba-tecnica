import { RoleType } from "../rol/roltype.enum";

export interface IJwtPayload {
    idUsuario: number;
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    status: string;
    roles: RoleType[];
    iat?: Date;
}