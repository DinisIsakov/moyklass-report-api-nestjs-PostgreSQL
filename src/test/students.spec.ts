// teachers.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from '../teachers/teachers.controller';
import { TeachersService } from '../teachers/teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../teachers/entities/teacher.entity';

describe('TeachersController', () => {
  let controller: TeachersController;
  let service: TeachersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [TeachersController],
      providers: [TeachersService],
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            keepConnectionAlive: true,
          }),
        }),
        TypeOrmModule.forFeature([Teacher]),
      ],
    }).compile();

    controller = module.get<TeachersController>(TeachersController);
    service = module.get<TeachersService>(TeachersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTeachers', () => {
    it('should get teachers', async () => {
      const mockTeachers = [{ id: 1, name: 'Oleg' }];
      jest.spyOn(service, 'getTeachers').mockResolvedValue(mockTeachers);

      const result = await controller.getTeachers();

      expect(result).toEqual(mockTeachers);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Произошла ошибка при получении учителей';
      jest
        .spyOn(service, 'getTeachers')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.getTeachers()).rejects.toThrow(errorMessage);
    });
  });

  describe('createTeacher', () => {
    it('should create teacher', async () => {
      const teacherData = { name: 'Oleg' };
      const mockTeacherId = 1;
      jest.spyOn(service, 'createTeacher').mockResolvedValue(mockTeacherId);

      const result = await controller.createTeacher(teacherData);

      expect(result).toEqual(mockTeacherId);
    });

    it('should handle errors during teacher creation', async () => {
      const teacherData = { name: 'Oleg' };
      const errorMessage = 'Произошла ошибка при создании учителя';
      jest
        .spyOn(service, 'createTeacher')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.createTeacher(teacherData)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
