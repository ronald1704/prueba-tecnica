import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateRolDto, ReadRolDto, UpdateRolDto } from "./dto";
import { Rol } from "./rol.entity";
import { RolService } from "./rol.service";

@Controller("roles")
export class RolController {
    constructor(private readonly _rolService: RolService) { }

    @Get(":id")
    getRol(@Param("id", ParseIntPipe) id: number): Promise<ReadRolDto> {
        return this._rolService.get(id);
    }

    @Get()
    getAll(): Promise<ReadRolDto[]> {
        return this._rolService.getAll()
    }

    @Post("create")
    createRol(@Body() rol: Partial<CreateRolDto>): Promise<ReadRolDto> {
        return this._rolService.create(rol);
    }

    @Patch(":idRol")
    updateRol(@Param("idRol", ParseIntPipe) idRol: number, @Body() rol: Partial<UpdateRolDto>): Promise<ReadRolDto> {
        return this._rolService.update(idRol, rol);
    }

    @Delete(":idRol")
    deleteRol(@Param("idRol", ParseIntPipe) idRol: number): Promise<void> {
        return this._rolService.delete(idRol);
    }
}