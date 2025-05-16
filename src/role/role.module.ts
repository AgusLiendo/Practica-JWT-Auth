import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '../entities/rol.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from 'src/permission/permission.module';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([RolEntity]), PermissionModule],
    providers: [RoleService, JwtService, UsersService],
    controllers: [RoleController],
    exports: [TypeOrmModule],
})
export class RoleModule {}

