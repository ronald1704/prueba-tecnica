import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { Status } from "../../../../shared/entity.status.enum";
import { Configuration } from "../../../config/config.keys";
import { ConfigService } from "../../../config/config.service";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get(Configuration.JWT_SECRET)
        });
    }

    async validate(payload: IJwtPayload) {
        const { nombre } = payload;
        const usuario = await this._authRepository.findOne({ where: { nombre, status: Status.ACTIVO } });

        if (!usuario) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}