import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';

@Injectable()
export class TodoApiService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  getTodolist(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodolistByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      relations: {
        todos: true,
      },
      where: {
        id: userId,
      },
    });
    return user.todos;
  }

  async createTodo(todoData: createTodoDto, userId: number) {
    await this.dataSource.transaction(async () => {
      const dataToCreate = new Todo();
      const user = await this.userRepository.findOneBy({ id: userId });
      dataToCreate.content = todoData.content;
      dataToCreate.user = user;
      await this.todoRepository.save(dataToCreate);
    });
  }

  async removeTodo(remove_uuid: string) {
    await this.dataSource.transaction(async () => {
      const dataToRemove = await this.todoRepository.findOneBy({
        uuid: remove_uuid,
      });
      await this.todoRepository.remove(dataToRemove);
    });
  }

  async changeTodo(change_uuid: string, todoData: updateTodoDto) {
    await this.dataSource.transaction(async () => {
      const dataToChange = await this.todoRepository.findOneBy({
        uuid: change_uuid,
      });
      dataToChange.content = todoData.content;
      await this.todoRepository.save(dataToChange);
    });
  }
}
