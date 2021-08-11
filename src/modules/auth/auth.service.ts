import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcryptjs";
import { plainToClass } from "class-transformer";
import { RoleType } from "../rol/roltype.enum";
import { Usuario } from "../usuario/usuario.entity";
import { AuthRepository } from "./auth.repository";
import { LoggedInDto, SigninDto, SignupDto } from "./dto";
import { IJwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService) { }

    async signup(signupDto: SignupDto): Promise<void> {
        const { nombre, apellido, telefono, correo, contrasenia } = signupDto;
        const userExist = await this._authRepository.findOne({ where: [{ correo }] });
        if (userExist) {
            throw new ConflictException("Correo ya existe!!!");
        }
        return this._authRepository.signup(signupDto);
    }

    async signIn(signinDto: SigninDto): Promise<LoggedInDto> {
        const { nombre, contrasenia } = signinDto;

        const usuario: Usuario = await this._authRepository.findOne({ where: { nombre } });
        if (!usuario) {
            throw new NotFoundException("El usuario ingresado no existe!!!!");
        }
        const isMatch = await compare(contrasenia, usuario.contrasenia);

        if (!isMatch) {
            throw new UnauthorizedException("Credenciales invalidas!!!");
        }

        const payload: IJwtPayload = {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            correo: usuario.correo,
            status: usuario.status,
            roles: usuario.roles.map(r => r.rol as RoleType)
        }

        const token = this._jwtService.sign(payload);
        return plainToClass(LoggedInDto, { token, usuario });
    }
}
