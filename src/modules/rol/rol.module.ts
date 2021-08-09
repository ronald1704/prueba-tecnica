import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './rol.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RolRepository])]
})
export class RolModule { }
