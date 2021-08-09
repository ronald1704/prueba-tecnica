import { createParamDecorator } from "@nestjs/common";
import { UsuarioDto } from "../usuario/dto/usuario.dto"
export const GetUsuario = createParamDecorator((key, req) => key ? req.usuario[key] : req.usuario);