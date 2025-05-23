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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import {PermissionsGuard} from "./middlewares/permissions.middleware";
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),

    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: configService.get('DB_SSL') === 'true' 
      ? { rejectUnauthorized: false }  // Azure acepta esto
      : false,
    }),
  }),

  TypeOrmModule.forFeature(entities),

  PermissionModule,

  RoleModule,

  UsersModule,

  JwtModule,
  
  ],
  controllers: [AppController,UsersController, RoleController, PermissionController],
  providers: [AuthGuard, JwtService, UsersService, RoleService, PermissionService, PermissionsGuard],
})
export class AppModule {}


