import { User } from '@/modules/users/schemas/user.schema'
import { UsersService } from '@/modules/users/users.service'
import { IJwtPayload } from '@/shared/interfaces/jwt.interface'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
    })
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.usersService.findUserById(payload.sub)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
