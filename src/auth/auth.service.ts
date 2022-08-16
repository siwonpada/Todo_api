import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuations from 'src/config/configuations';
import { UsersService } from 'src/users/users.service';
import { accessCookiesDto } from './dto/accessCookies.dto';
import { refreshCookiesDto } from './dto/refreshCookies.dto';
import { validateUserDto } from './dto/validateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<validateUserDto | null> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getCookieWithJwtAccessToken(
    data: validateUserDto,
  ): Promise<accessCookiesDto> {
    const payload = { username: data.username, sub: data.id };
    const token = this.jwtService.sign(payload, {
      secret: configuations().JWT.secret,
      expiresIn: configuations().JWT.expiresIn,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 1000,
    };
  }

  async getCookieWithJwtRefreshToken(
    data: validateUserDto,
  ): Promise<refreshCookiesDto> {
    const payload = { username: data.username, sub: data.id };
    const token = this.jwtService.sign(payload, {
      secret: configuations().JWT.refresh_secret,
      expiresIn: configuations().JWT.refresh_exprires,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 10000,
    };
  }
}
