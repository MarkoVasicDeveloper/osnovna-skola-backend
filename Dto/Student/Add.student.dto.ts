/* eslint-disable prettier/prettier */
import * as validator from 'class-validator';

export default class AddStudentDto {
  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 40)
  school: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 30)
  name: string;
}
