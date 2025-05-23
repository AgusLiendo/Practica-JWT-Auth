import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RolEntity } from "../entities/rol.entity"
import { RoleService } from "./role.service"
import { RoleController } from "./role.controller"
import { PermissionModule } from "src/permission/permission.module"
import { UsersModule } from "src/users/users.module"
import { JwtModule } from "src/jwt/jwt.module"
import { PermissionsGuard } from "src/middlewares/permissions.middleware"

@Module({
    imports: [TypeOrmModule.forFeature([RolEntity]), PermissionModule, UsersModule, JwtModule],
    providers: [RoleService, PermissionsGuard],
    controllers: [RoleController],
    exports: [TypeOrmModule],
})
export class RoleModule {}
