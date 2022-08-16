import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import { DataSource } from 'typeorm';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { TodoApiRepository } from './todo-api.repository';

@Injectable()
export class TodoApiService {
  constructor(
    private todoApirepository: TodoApiRepository,
    private dataSource: DataSource,
  ) {}

  async getTodolist(): Promise<Todo[]> {
    return this.todoApirepository.getTodolist();
  }

  async getTodolistByUserId(userId: number): Promise<Todo[]> {
    return this.todoApirepository.getTodolistByUserId(userId);
  }

  async createTodo(todoData: createTodoDto, userId: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await this.todoApirepository.createTodo(manager, todoData, userId);
    });
  }

  async removeTodo(remove_uuid: string, userId: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await this.todoApirepository.removeTodo(manager, remove_uuid, userId);
    });
  }

  async changeTodo(
    update_uuid: string,
    todoData: updateTodoDto,
    userId: number,
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await this.todoApirepository.changeTodo(
        manager,
        update_uuid,
        todoData,
        userId,
      );
    });
  }
}
