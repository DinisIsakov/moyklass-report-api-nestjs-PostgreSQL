// create-lesson.dto.ts
export class CreateLessonDto {
  readonly teacherIds: number[];
  readonly title: string;
  readonly days: number[];
  readonly firstDate: string;
  readonly lessonsCount?: number;
  readonly lastDate?: string;
}
