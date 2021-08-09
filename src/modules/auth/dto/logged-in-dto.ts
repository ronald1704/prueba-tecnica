import { Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { ReadUseruarioDto } from "../../../modules/usuario/dto";

export class LoggedInDto {
    @Expose()
    @IsString()
    token: string;

    @Expose()
    @Type(() => ReadUseruarioDto)
    usuario: ReadUseruarioDto;

}