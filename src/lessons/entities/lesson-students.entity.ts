// lesson-students.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';
import { Student } from '../../students/entities/student.entity';

@Entity({ name: 'lesson_students' })
export class LessonStudent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: false })
  visit: boolean;

  // Relationships
  @ManyToOne(() => Lesson, (lesson) => lesson.lessonStudents)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @ManyToOne(() => Student, (student) => student.lessons)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
