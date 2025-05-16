import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '../entities/rol.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
    imports: [TypeOrmModule.forFeature([RolEntity]), PermissionModule],
    providers: [RoleService],
    controllers: [RoleController],
    exports: [TypeOrmModule],
})
export class RoleModule {}

