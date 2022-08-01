import { IsString } from 'class-validator';

export class createTodoDto {
  @IsString()
  content: string;
}
