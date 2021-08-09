import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RolRepository } from '../rol/rol.repository';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioRepository, RolRepository]), AuthModule],
    providers: [UsuarioService],
    controllers: [UsuarioController]
})
export class UsuarioModule { }
