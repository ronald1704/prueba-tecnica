import { IsString, MaxLength, maxLength } from "class-validator";

export class CreateRolDto {
    @IsString()
    @MaxLength(20, { message: "Este rol no es valido!!!" })
    readonly rol: string;
}