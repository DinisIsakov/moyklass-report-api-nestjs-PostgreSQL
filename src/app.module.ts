import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { typeOrmConfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LessonsModule,
    StudentsModule,
    TeachersModule,
  ],
})
export class AppModule {}
