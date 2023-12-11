// lesson-teachers.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity({ name: 'lesson_teachers' })
export class LessonTeacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Relationships
  @ManyToOne(() => Lesson, (lesson) => lesson.lessonTeachers)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
