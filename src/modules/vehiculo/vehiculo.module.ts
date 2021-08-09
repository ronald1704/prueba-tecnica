import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoRepository } from './vehiculo.repository';

@Module({
    imports: [TypeOrmModule.forFeature([VehiculoRepository])]
})
export class VehiculoModule { }
