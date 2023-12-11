import {
  Injectable,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class TeachersService {
  private readonly logger = new Logger(TeachersService.name);

  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  async getTeachers(): Promise<any[]> {
    try {
      return await this.teachersRepository.find();
    } catch (error) {
      this.handleErrors('Получение списка учителей', error);
    }
  }

  async createTeacher(data: CreateTeacherDto): Promise<number> {
    try {
      const teacher = this.teachersRepository.create(
        data as DeepPartial<Teacher>,
      );
      await this.teachersRepository.save(teacher);
      this.logger.log(`Успешно создан учитель. Идентификатор: ${teacher.id}`);
      return teacher.id;
    } catch (error) {
      this.handleErrors('Создание учителя', error);
    }
  }

  private handleErrors(context: string, error: any): void {
    this.logger.error(`Ошибка при ${context}: ${error.message}`, error.stack);
    throw new HttpException(
      `Произошла ошибка при ${context}: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
