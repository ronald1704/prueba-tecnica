import { IsString, MaxLength } from "class-validator";

export class UpdateRolDto {
    @IsString()
    @MaxLength(20, { message: "Este rol no es valido!!!" })
    readonly rol: string;
}