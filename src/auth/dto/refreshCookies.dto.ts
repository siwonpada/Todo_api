import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class refreshCookiesDto {
  @IsString()
  refreshToken: string;

  @IsString()
  domain: string;

  @IsString()
  path: string;

  @IsBoolean()
  httpOnly: boolean;

  @IsNumber()
  maxAge: number;
}
