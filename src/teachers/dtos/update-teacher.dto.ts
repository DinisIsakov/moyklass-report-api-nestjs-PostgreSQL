import { IsNotEmpty } from 'class-validator';

export class UpdateTeacherDto {
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  readonly name: string;
}
