import {
  HttpException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common"
import type { LoginDTO } from "../interfaces/login.dto"
import type { RegisterDTO } from "../interfaces/user-register.dto"
import type { UserI } from "../interfaces/user.interface"
import { UserEntity } from "../entities/user.entity"
import { hashSync, compareSync } from "bcrypt"
import type { JwtService } from "../jwt/jwt.service"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { RolEntity } from "../entities/rol.entity"

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<UserEntity>
  private readonly roleRepository: Repository<RolEntity>
  constructor(
      private jwtService: JwtService,
      @InjectRepository(UserEntity)
      userRepository: Repository<UserEntity>,
      @InjectRepository(RolEntity)
      roleRepository: Repository<RolEntity>,
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken)
  }

  canDo(user: UserI, permission: string): boolean {
    const result = user.permissionCodes.includes(permission)
    if (!result) {
      throw new UnauthorizedException()
    }
    return true
  }

  async register(body: RegisterDTO) {
    try {
      // Find the role first
      const role = await this.roleRepository.findOne({
        where: { id: body.rolId },
      })

      if (!role) {
        throw new NotFoundException(`Role with ID ${body.rolId} not found`)
      }

      // Create new user
      const user = new UserEntity()
      user.email = body.email
      user.password = hashSync(body.password, 10)
      user.rol = role // Set the role object, not just the ID

      // Save the user
      await this.userRepository.save(user)

      return {
        status: "created",
        user: {
          id: user.id,
          email: user.email,
          role: {
            id: role.id,
            name: role.name,
            code: role.code,
          },
        },
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      // Handle duplicate email
      if (error.code === "23505") {
        // PostgreSQL unique violation code
        throw new BadRequestException("El email ya está registrado")
      }

      console.error("Error creating user:", error)
      throw new HttpException("Error de creación: " + error.message, 500)
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email)
    if (user == null) {
      throw new UnauthorizedException("Usuario o contraseña incorrectos")
    }
    const compareResult = compareSync(body.password, user.password)
    if (!compareResult) {
      throw new UnauthorizedException("Usuario o contraseña incorrectos")
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, "auth"),
      refreshToken: this.jwtService.generateToken({ email: user.email }, "refresh"),
      user: {
        email: user.email,
        role: user.rol
            ? {
              id: user.rol.id,
              name: user.rol.name,
              code: user.rol.code,
            }
            : null,
      },
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ["rol", "rol.permisos"],
    })
  }
}
