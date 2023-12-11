import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { GetLessonsDto } from './dtos/get-lessons.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
@UseInterceptors(ClassSerializerInterceptor)
export class LessonsController {
  private readonly logger = new Logger(LessonsController.name);

  constructor(private readonly lessonsService: LessonsService) {}

  @Get('/')
  async getLessons(
    @Query(new ValidationPipe()) filter: GetLessonsDto,
  ): Promise<any[]> {
    return this.handleRequest(
      () => this.lessonsService.getLessonsByFilter(filter),
      'getLessons',
    );
  }

  @Post('/')
  async createLessons(
    @Body(new ValidationPipe()) data: CreateLessonDto,
  ): Promise<number[]> {
    return this.handleRequest(
      () => this.lessonsService.createLessons(data),
      'createLessons',
    );
  }

  private async handleRequest(
    callback: () => Promise<any>,
    context: string,
  ): Promise<any> {
    try {
      return await callback();
    } catch (error) {
      this.logError(context, error);
      this.throwBadRequestException(context, error);
    }
  }

  private logError(context: string, error: Error): void {
    const errorMessage = `Ошибка в ${context}: ${error.message}`;
    this.logger.error(errorMessage, error.stack);
  }

  private throwBadRequestException(context: string, error: Error): void {
    throw new HttpException(
      { message: `Произошла ошибка в ${context}`, error },
      HttpStatus.BAD_REQUEST,
    );
  }
}
