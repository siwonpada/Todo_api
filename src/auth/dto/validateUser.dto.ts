import { IsNumber, IsString } from 'class-validator';

export class validateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;
}
