import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { PermissionService } from './permission/permission.service';
import { PermissionController } from './permission/permission.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'db.sql',
      entities,
      type: 'sqlite',
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController,UsersController, RoleController, PermissionController],
  providers: [AuthGuard, JwtService, UsersService, RoleService, PermissionService],
})
export class AppModule {}
