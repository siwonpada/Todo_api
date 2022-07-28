import { PartialType } from '@nestjs/mapped-types';
import { createTodoDto } from './createTodo.dto';

export class updateTodoDto extends PartialType(createTodoDto) {}
