import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoApiController],
  providers: [TodoApiService],
})
export class TodoApiModule {}
