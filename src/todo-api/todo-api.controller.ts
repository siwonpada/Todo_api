import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { TodoApiService } from './todo-api.service';

@Controller('todo-api')
export class TodoApiController {
  constructor(private readonly TodoApiService: TodoApiService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTodolist() {
    return this.TodoApiService.getTodolist();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getTodolistById(@Request() req) {
    return this.TodoApiService.getTodolistByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTodo(@Body() todoData: createTodoDto, @Request() req) {
    return this.TodoApiService.createTodo(todoData, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:uuid')
  removeTodo(@Param('uuid') uuid: string, @Request() req) {
    return this.TodoApiService.removeTodo(uuid, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:uuid')
  changeTodo(
    @Param('uuid') uuid: string,
    @Body() todoData: updateTodoDto,
    @Request() req,
  ) {
    return this.TodoApiService.changeTodo(uuid, todoData, req.user.userId);
  }
}
