import { LessonStudent } from '../../lessons/entities/lesson-students.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Relationships
  @OneToMany(() => LessonStudent, (lessonStudent) => lessonStudent.student)
  lessons: LessonStudent[];
}
