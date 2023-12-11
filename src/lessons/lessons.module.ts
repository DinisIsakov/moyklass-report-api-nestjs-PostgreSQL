// lessons/lessons.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { LessonStudent } from './entities/lesson-students.entity';
import { LessonTeacher } from './entities/lesson-teachers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, LessonStudent, LessonTeacher])],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
