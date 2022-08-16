import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { validateUserDto } from './dto/validateUser.dto';
import { JwtReFreshGuard } from './jwt-refresh.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user: validateUserDto = req.user;
    const { accessToken, ...accessOption } =
      await this.authService.getCookieWithJwtAccessToken(user);

    const { refreshToken, ...refreshOption } =
      await this.authService.getCookieWithJwtRefreshToken(user);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return user;
  }

  @UseGuards(JwtReFreshGuard)
  @Get('/refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } =
      await this.authService.getCookieWithJwtAccessToken(user.id);
    res.cookie('authentication', accessToken, accessOption);
    return user;
  }
}
