import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuations from 'src/config/configuations';
import { validateUserByJwtDto } from './dto/validateUserByJWT.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configuations().JWT.secret,
    });
  }

  async validate(payload: any): Promise<validateUserByJwtDto> {
    return { userId: payload.sub, username: payload.username };
  }
}
