import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Status } from "../../../shared/entity.status.enum";
import { ReadUseruarioDto, UpdateUsuarioDto } from "./dto";
import { UsuarioService } from "./usuario.service";

@Controller("usuarios")
export class UsuarioController {
    constructor(private readonly _userService: UsuarioService) { }
    @Get(":idUsuario")
    getUsuario(@Param("idUsuario", ParseIntPipe) idUsuario: number): Promise<ReadUseruarioDto> {
        return this._userService.get(idUsuario);
    }

    @Get()
    getUsuarios(): Promise<ReadUseruarioDto[]> {
        return this._userService.getAll();
    }

    @Patch(":idUsuario")
    updateUsuario(@Param("idUsuario", ParseIntPipe) idUsuario: number, @Body() usuario: UpdateUsuarioDto) {
        return this._userService.update(idUsuario, usuario);
    }

    @Delete(":idUsuario")
    deleteUsuario(@Param("idUsuario", ParseIntPipe) idUsuario: number): Promise<void> {
        return this._userService.delete(idUsuario);
    }

    @Post("setRole/:idUsuario/:idRol")
    setRoleToUser(@Param("idUsuario", ParseIntPipe) idUsuario: number, @Param("idRol", ParseIntPipe) idRol: number): Promise<boolean> {
        return this._userService.setRolToUser(idUsuario, idRol);
    }
}