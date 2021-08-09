import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString, MaxLength } from "class-validator";

@Exclude()
export class ReadRolDto {
    @Expose()
    @IsNumber()
    readonly idRol: number;

    @Expose()
    @IsString()
    @MaxLength(20, { message: "Este rol no es valido!!!" })
    readonly rol: string;
}