import { User } from '@/modules/users/schemas/user.schema'
import { UsersService } from '@/modules/users/users.service'
import { IJwtPayload } from '@/shared/interfaces/jwt.interface'
import { compare } from '@/shared/utils'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET_KEY'),
      passReqToCallback: true,
    })
  }

  async validate(request: Request, payload: IJwtPayload): Promise<User> {
    const refreshToken = request.headers.authorization.split(' ')[1]

    const user = await this.usersService.findUserById(payload.sub)

    if (!user) {
      throw new UnauthorizedException()
    }

    const isRefreshTokenValid = await compare(refreshToken, user.refreshToken)

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException()
    }

    return user
  }
}
