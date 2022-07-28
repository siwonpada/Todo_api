import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { TodoApiService } from './todo-api.service';

@Controller('todo-api')
export class TodoApiController {
  constructor(private readonly TodoApiService: TodoApiService) {}

  @Get()
  getTodolist() {
    return this.TodoApiService.getTodolist();
  }

  @Post()
  createTodo(@Body() todoData: createTodoDto) {
    return this.TodoApiService.createTodo(todoData);
  }

  @Delete('/:uuid')
  removeTodo(@Param('uuid') uuid: string) {
    return this.TodoApiService.removeTodo(uuid);
  }

  @Put('/:uuid')
  changeTodo(@Param('uuid') uuid: string, @Body() todoData: updateTodoDto) {
    return this.TodoApiService.changeTodo(uuid, todoData);
  }
}
