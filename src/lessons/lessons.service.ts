import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { GetLessonsDto } from './dtos/get-lessons.dto';
import { CreateLessonDto } from './dtos/create-lesson.dto';

@Injectable()
export class LessonsService {
  private readonly logger = new Logger(LessonsService.name);

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async getLessonsByFilter(filter: GetLessonsDto): Promise<Lesson[]> {
    try {
      const { date, status, teacherIds, studentsCount } = filter;
      const whereClause: Record<string, any> = {};

      if (date) {
        if (typeof date === 'string') {
          whereClause.date = date;
        } else if (Array.isArray(date) && (date as string[]).length === 2) {
          const [startDate, endDate] = date as string[];
          whereClause.date = { $gte: startDate, $lte: endDate };
        } else {
          throw new Error('Invalid date format');
        }
      }

      if (status !== undefined) {
        whereClause.status = status;
      }

      if (teacherIds) {
        whereClause.lessonTeachers = Array.isArray(teacherIds)
          ? { id: { $in: teacherIds } }
          : { id: teacherIds };
      }

      if (studentsCount) {
        if (typeof studentsCount === 'string') {
          whereClause.studentsCount = studentsCount;
        } else if (Array.isArray(studentsCount) && studentsCount.length === 2) {
          const [minCount, maxCount] = studentsCount as number[];
          whereClause.studentsCount = { $gte: minCount, $lte: maxCount };
        }
      }

      const lessons = await this.lessonsRepository.find({
        where: whereClause,
        take: filter.lessonsPerPage || 5,
        skip: (filter.page - 1) * (filter.lessonsPerPage || 5),
      });

      return lessons;
    } catch (error) {
      this.handleServiceError('getLessonsByFilter', error);
    }
  }

  async createLessons(data: CreateLessonDto): Promise<number[]> {
    try {
      const { teacherIds, title, days, firstDate, lessonsCount } = data;
      const createdLessonIds: number[] = [];

      for (let i = 0; i < lessonsCount; i++) {
        const lessonTeachers = teacherIds?.map((id) => ({ id })) || [];

        const lessonData: DeepPartial<Lesson> = {
          title,
          date: new Date(firstDate),
          status: 0,
          lessonTeachers,
          ...(days && { days }),
        };

        const lesson = await this.lessonsRepository.create(lessonData);
        const savedLesson = await this.lessonsRepository.save(lesson);
        createdLessonIds.push(savedLesson.id);
      }

      this.logger.log(
        `Успешно созданы занятия с ID: ${createdLessonIds.join(', ')}`,
      );
      return createdLessonIds;
    } catch (error) {
      this.handleServiceError('createLessons', error);
    }
  }

  private handleServiceError(context: string, error: Error) {
    this.logger.error(`Ошибка в ${context}: ${error.message}`, error.stack);
    throw new HttpException(
      { message: `Произошла ошибка в ${context}`, error },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
