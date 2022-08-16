import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class accessCookiesDto {
  @IsString()
  accessToken: string;

  @IsString()
  domain: string;

  @IsString()
  path: string;

  @IsBoolean()
  httpOnly: boolean;

  @IsNumber()
  maxAge: number;
}
