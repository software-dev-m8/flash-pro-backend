import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto'
import { ILogoutResponse } from '@/shared/interfaces'
import { GetUser } from '@/common/decorators'
import { AccessTokenGuard, RefreshTokenGuard } from '@/common/guards'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  async logout(@GetUser('id') userId: string): Promise<ILogoutResponse> {
    return this.authService.logout(userId)
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@GetUser('id') userId: string) {
    return this.authService.refreshToken(userId)
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async me(@GetUser('id') userId: string) {
    return this.authService.me(userId)
  }
}
