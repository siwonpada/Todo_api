import { IsNumber, IsString } from 'class-validator';

export class createTodoDto {
  @IsNumber()
  id: number;

  @IsString()
  content: string;
}
