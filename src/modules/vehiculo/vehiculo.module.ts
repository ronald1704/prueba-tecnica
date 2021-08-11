import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoController } from './vehiculo.controller';
import { VehiculoRepository } from './vehiculo.repository';
import { VehiculoService } from './vehiculo.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehiculoRepository])],
    providers: [VehiculoService],
    controllers: [VehiculoController]
})
export class VehiculoModule { }
