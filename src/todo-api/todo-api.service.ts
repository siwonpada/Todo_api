import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';

@Injectable()
export class TodoApiService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getTodolist(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  getTodolistByUserId(UserId: number): Promise<Todo[]> {
    return this.todoRepository.findBy({ id: UserId });
  }

  async createTodo(todoData: createTodoDto, userId: number) {
    const dataToCreate = new Todo();
    dataToCreate.id = userId;
    dataToCreate.content = todoData.content;
    await this.todoRepository.save(dataToCreate);
  }

  async removeTodo(remove_uuid: string) {
    const dataToRemove = await this.todoRepository.findOneBy({
      uuid: remove_uuid,
    });
    await this.todoRepository.remove(dataToRemove);
  }

  async changeTodo(change_uuid: string, todoData: updateTodoDto) {
    const dataToChange = await this.todoRepository.findOneBy({
      uuid: change_uuid,
    });
    dataToChange.content = todoData.content;
    await this.todoRepository.save(dataToChange);
  }
}
