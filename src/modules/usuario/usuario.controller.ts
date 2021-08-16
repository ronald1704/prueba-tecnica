import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Status } from "../../../shared/entity.status.enum";
import { Roles } from "../rol/decorators/rol.decorator";
import { RolGuard } from "../rol/guards/rol.guard";
import { ReadUseruarioDto, UpdateUsuarioDto } from "./dto";
import { UsuarioService } from "./usuario.service";

@Controller("usuarios")
export class UsuarioController {
    constructor(private readonly _usuarioService: UsuarioService) { }

    @Roles("ADMIN")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @Get(":idUsuario")
    getUsuario(@Param("idUsuario", ParseIntPipe) idUsuario: number): Promise<ReadUseruarioDto> {
        return this._usuarioService.get(idUsuario);
    }

    @Roles("ADMIN")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @Get()
    getUsuarios(): Promise<ReadUseruarioDto[]> {
        return this._usuarioService.getAll();
    }

    @Roles("ADMIN")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @Patch(":idUsuario")
    updateUsuario(@Param("idUsuario", ParseIntPipe) idUsuario: number, @Body() usuario: UpdateUsuarioDto) {
        return this._usuarioService.update(idUsuario, usuario);
    }

    @Roles("ADMIN")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @Delete(":idUsuario")
    deleteUsuario(@Param("idUsuario", ParseIntPipe) idUsuario: number): Promise<void> {
        return this._usuarioService.delete(idUsuario);
    }

    @Roles("ADMIN")
    @UseGuards(AuthGuard("jwt"), RolGuard)
    @Post("setRole/:idUsuario/:idRol")
    setRoleToUser(@Param("idUsuario", ParseIntPipe) idUsuario: number, @Param("idRol", ParseIntPipe) idRol: number): Promise<boolean> {
        return this._usuarioService.setRolToUser(idUsuario, idRol);
    }
}