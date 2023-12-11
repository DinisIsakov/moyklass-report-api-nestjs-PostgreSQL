// lesson.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { LessonTeacher } from './lesson-teachers.entity';
import { LessonStudent } from './lesson-students.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';

@Entity({ name: 'lessons' })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  title: string;

  @Column({ default: 0 })
  status: number;

  // Updated Relationships
  @OneToMany(() => LessonTeacher, (lessonTeacher) => lessonTeacher.lesson, {
    cascade: true,
  })
  lessonTeachers: LessonTeacher[];

  @OneToMany(() => LessonStudent, (lessonStudent) => lessonStudent.lesson, {
    cascade: true,
  })
  lessonStudents: LessonStudent[];

  // Remove the @ManyToMany annotation and the @JoinTable annotation
  @ManyToMany(() => Teacher, { cascade: true })
  teachers: Teacher[];

  // Remove the @ManyToMany annotation and the @JoinTable annotation
  @ManyToMany(() => Student, { cascade: true })
  students: Student[];
}
