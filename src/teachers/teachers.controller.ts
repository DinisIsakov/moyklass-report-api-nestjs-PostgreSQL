import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

@Controller('teachers')
@UseInterceptors(ClassSerializerInterceptor)
export class TeachersController {
  private readonly logger = new Logger(TeachersController.name);

  constructor(private readonly teachersService: TeachersService) {}

  @Get('/')
  async getTeachers(): Promise<any[]> {
    try {
      return await this.teachersService.getTeachers();
    } catch (error) {
      this.handleErrors('Получение списка учителей', error);
    }
  }

  @Post('/')
  async createTeacher(
    @Body(new ValidationPipe()) data: CreateTeacherDto,
  ): Promise<number> {
    try {
      const teacherId = await this.teachersService.createTeacher(data);
      this.logger.log(`Учитель успешно создан. Идентификатор: ${teacherId}`);
      return teacherId;
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
