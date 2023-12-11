// lessons.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from '../lessons/lessons.controller';
import { LessonsService } from '../lessons/lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateLessonDto } from '../lessons/dtos/create-lesson.dto';

describe('LessonsController', () => {
  let controller: LessonsController;
  let service: LessonsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [LessonsService],
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            keepConnectionAlive: true,
          }),
        }),
        TypeOrmModule.forFeature([Lesson]),
      ],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
    service = module.get<LessonsService>(LessonsService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLessons', () => {
    it('should create lessons', async () => {
      const lessonData: CreateLessonDto = {
        teacherIds: [1, 2],
        title: 'Developer',
        days: [1, 2, 4],
        firstDate: '2019-09-10',
        lessonsCount: 7,
        lastDate: '2019-12-31',
      };
      const mockLessonIds = [1, 2];
      jest.spyOn(service, 'createLessons').mockResolvedValue(mockLessonIds);

      const result = await controller.createLessons(lessonData);

      expect(result).toEqual(mockLessonIds);
    });

    it('should handle errors during lessons creation', async () => {
      const lessonData: CreateLessonDto = {
        teacherIds: [1, 2],
        title: 'Developer',
        days: [1, 2, 4],
        firstDate: '2019-09-10',
        lessonsCount: 7,
        lastDate: '2019-12-31',
      };
      const errorMessage = 'Произошла ошибка в создании занятий';
      jest
        .spyOn(service, 'createLessons')
        .mockRejectedValue(new Error(errorMessage));

      await expect(() => controller.createLessons(lessonData)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
