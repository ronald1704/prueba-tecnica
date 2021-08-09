import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';
import { DatabaseModule } from './database/database.module';
import { RolModule } from './modules/rol/rol.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [VehiculoModule, ConfigModule, DatabaseModule, RolModule, UsuarioModule, AuthModule],

})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
