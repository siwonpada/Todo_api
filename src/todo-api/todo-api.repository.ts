import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';

@Injectable()
export class TodoApiRepository {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getTodolist(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodolistByUserId(userId: number): Promise<Todo[]> {
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

  async createTodo(
    entitymanager: EntityManager,
    todoData: createTodoDto,
    userId: number,
  ): Promise<void> {
    const dataToCreate = new Todo();
    const user = await entitymanager.findOneBy(User, { id: userId });
    dataToCreate.content = todoData.content;
    dataToCreate.user = user;
    await entitymanager.save(dataToCreate);
  }

  async removeTodo(
    entitymanager: EntityManager,
    remove_uuid: string,
    userId: number,
  ): Promise<void> {
    const dataToRemove = await entitymanager.findOne(Todo, {
      relations: {
        user: true,
      },
      where: {
        uuid: remove_uuid,
      },
    });
    const user = await entitymanager.findOneBy(User, {
      id: userId,
    });
    if (dataToRemove.user === user) {
      await entitymanager.remove(dataToRemove);
    }
  }

  async changeTodo(
    entitymanager: EntityManager,
    update_uuid: string,
    todoData: updateTodoDto,
    userId: number,
  ): Promise<void> {
    const dataToChange = await entitymanager.findOne(Todo, {
      relations: {
        user: true,
      },
      where: {
        uuid: update_uuid,
      },
    });
    const user = await entitymanager.findOneBy(User, { id: userId });
    if (dataToChange.user === user) {
      dataToChange.content = todoData.content;
      await entitymanager.save(dataToChange);
    }
  }
}
