import { Test, TestingModule } from '@nestjs/testing';
import { TodoApiController } from './todo-api.controller';

describe('TodoApiController', () => {
  let controller: TodoApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoApiController],
    }).compile();

    controller = module.get<TodoApiController>(TodoApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
