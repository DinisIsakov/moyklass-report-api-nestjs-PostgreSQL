import { IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  readonly name: string;
}
