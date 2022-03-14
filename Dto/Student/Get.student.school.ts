/* eslint-disable prettier/prettier */
import * as validator from 'class-validator';

export default class GetStudentBySchool {
  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 40)
  school: string;
}
