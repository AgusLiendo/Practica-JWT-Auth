import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from '../entities/permission.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Permiso])],

    providers: [PermissionService],

    controllers: [PermissionController],

    exports: [TypeOrmModule],
})
export class PermissionModule {}