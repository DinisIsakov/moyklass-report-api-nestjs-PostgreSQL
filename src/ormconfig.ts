import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LessonStudent } from 'lessons/entities/lesson-students.entity';
import { LessonTeacher } from 'lessons/entities/lesson-teachers.entity';
import { Lesson } from 'lessons/entities/lesson.entity';
import { Student } from 'students/entities/student.entity';
import { Teacher } from 'teachers/entities/teacher.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Lesson, Student, Teacher, LessonStudent, LessonTeacher],
  synchronize: true,
  logging: true,
  schema: 'public',
  migrations: [],
};
