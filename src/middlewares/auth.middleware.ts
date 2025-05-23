import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import type { Reflector } from "@nestjs/core"
import type { RequestWithUser } from "src/interfaces/request-user"
import type { JwtService } from "src/jwt/jwt.service"
import type { UsersService } from "src/users/users.service"
import { Permissions } from "./decorators/permissions.decorator"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private jwtService: JwtService,
      private usersService: UsersService,
      private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: RequestWithUser = context.switchToHttp().getRequest()
      const authHeader = request.headers.authorization

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException("Token de autorización requerido")
      }

      const token = authHeader.replace("Bearer ", "")
      const payload = this.jwtService.getPayload(token)
      const user = await this.usersService.findByEmail(payload.email)

      if (!user) {
        throw new UnauthorizedException("Usuario no encontrado")
      }

      request.user = user

      // Log permissions only when they exist (for debugging)
      const permissions = this.reflector.get(Permissions, context.getHandler())
      if (permissions && permissions.length > 0) {
        console.log("Required permissions:", permissions)
        console.log("User permissions:", user.permissionCodes)
      }

      return true
    } catch (error) {
      throw new UnauthorizedException(error?.message || "Token inválido")
    }
  }
}
