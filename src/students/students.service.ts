// src/modules/students/students.service.ts

import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dtos/create-student.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<any[]> {
    try {
      return await this.studentsRepository.find();
    } catch (error) {
      this.handleServiceError('Получение студентов', error);
    }
  }

  async createStudent(data: CreateStudentDto): Promise<number> {
    try {
      const student = this.studentsRepository.create(data);
      await this.studentsRepository.save(student);
      this.logger.log(
        `Успешно создан студент с идентификатором: ${student.id}`,
      );
      return student.id;
    } catch (error) {
      this.handleServiceError('Создание студента', error);
    }
  }

  private handleServiceError(action: string, error: any): void {
    this.logger.error(`Ошибка при ${action}: ${error.message}`);
    throw new HttpException(
      `Ошибка при ${action}: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
