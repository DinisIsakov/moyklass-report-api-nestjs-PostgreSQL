// get-lessons.dto.ts
export class GetLessonsDto {
  readonly date?: string;
  readonly status?: number;
  readonly teacherIds?: number[];
  readonly studentsCount?: number | number[];
  readonly page?: number;
  readonly lessonsPerPage?: number;
}
