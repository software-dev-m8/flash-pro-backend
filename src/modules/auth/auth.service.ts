import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { ConfigService } from '@nestjs/config'
import {
  IJwtPayload,
  ICreateToken,
  ILoginResponse,
  IRefreshTokenResponse,
  ILogoutResponse,
} from '@/shared/interfaces'
import { LoginDto } from './dto'
import { compare, hash } from '@/shared/utils'
import { Role } from '@/shared/enums'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  private async createToken(payload: IJwtPayload): Promise<ICreateToken> {
    const createTokenWithKey = async (key: string, expiresIn: number) =>
      this.jwtService.sign(payload, {
        secret: this.configService.get(key),
        expiresIn,
      })

    const [accessToken, refreshToken] = await Promise.all([
      createTokenWithKey(
        'JWT_ACCESS_SECRET_KEY',
        this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      ),
      createTokenWithKey(
        'JWT_REFRESH_SECRET_KEY',
        this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      ),
    ])

    return { accessToken, refreshToken }
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const existingUser = await this.usersService.findUserByEmail(loginDto.email)

    if (
      !existingUser ||
      !(await compare(loginDto.password, existingUser.password))
    ) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: existingUser.id, role: existingUser.role as Role }
    const token = await this.createToken(payload)

    const refreshToken = await hash(token.refreshToken)
    await this.usersService.updateUser(existingUser.id, {
      refreshToken: refreshToken,
    })

    return {
      ...token,
      user: {
        ...existingUser,
        password: undefined,
        refreshToken: undefined,
      },
    }
  }

  async refreshToken(userId: string): Promise<IRefreshTokenResponse> {
    const existingUser = await this.usersService.findUserById(userId)

    const payload = { sub: userId, role: existingUser.role as Role }
    const token = await this.createToken(payload)

    const refreshToken = await hash(token.refreshToken)

    await this.usersService.updateUser(userId, { refreshToken: refreshToken })

    return token
  }

  async logout(userId: string): Promise<ILogoutResponse> {
    await this.usersService.updateUser(userId, { refreshToken: null })
    return {
      message: 'User logged out',
    }
  }

  async me(userId: string) {
    const user = await this.usersService.findUserById(userId)
    return {
      ...user,
      password: undefined,
      refreshToken: undefined,
    }
  }
}
