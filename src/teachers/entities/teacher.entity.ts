// teachers.entity.ts
import { LessonTeacher } from '../../lessons/entities/lesson-teachers.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'teachers' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Relationships
  @OneToMany(() => LessonTeacher, (lessonTeacher) => lessonTeacher.teacher, {
    cascade: true,
  })
  lessons: LessonTeacher[];
}
