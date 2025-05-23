import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from './decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
        Permissions,
        context.getHandler(),
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // no hay permisos definidos en el handler
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.rol) {
      throw new ForbiddenException('Usuario no autenticado o inválido');
    }

    const userPermissions = user.permissionCodes;
    const hasPermission = requiredPermissions.every(permission =>
        userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('No tiene permisos suficientes');
    }

    return true;
  }
}