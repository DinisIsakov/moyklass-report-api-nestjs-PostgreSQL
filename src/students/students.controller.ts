import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/create-student.dto';

@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/')
  async getStudents(): Promise<any[]> {
    try {
      const students = await this.studentsService.getStudents();
      return students;
    } catch (error) {
      throw new HttpException(
        `Ошибка при получении студентов: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/')
  async createStudent(
    @Body(new ValidationPipe()) data: CreateStudentDto,
  ): Promise<number> {
    try {
      const studentId = await this.studentsService.createStudent(data);
      return studentId;
    } catch (error) {
      throw new HttpException(
        `Ошибка при создании студента: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
