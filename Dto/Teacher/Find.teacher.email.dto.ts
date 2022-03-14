/* eslint-disable prettier/prettier */
import * as validation from 'class-validator';

export default class FindTeacherByEmailDto {
  @validation.IsNotEmpty()
  @validation.IsString()
  @validation.Length(3, 40)
  email: string;
}
