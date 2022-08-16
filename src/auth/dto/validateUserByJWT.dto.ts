import { IsNumber, IsString } from 'class-validator';

export class validateUserByJwtDto {
  @IsNumber()
  userId: number;

  @IsString()
  username: string;
}
