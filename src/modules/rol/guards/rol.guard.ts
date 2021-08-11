import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const roles: string[] = this._reflector.get<string[]>("roles", context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { usuario } = request;

        const hashRol = () => usuario.roles.some((rol: string) => roles.includes(rol));

        return usuario && usuario.roles && hashRol();
    }
}