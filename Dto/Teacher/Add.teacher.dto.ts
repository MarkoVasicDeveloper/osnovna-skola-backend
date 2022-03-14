/* eslint-disable prettier/prettier */
import * as validator from 'class-validator';
export default class AddTeacherDto {
  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 20)
  name: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 20)
  surname: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 40)
  email: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 20)
  school: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 20)
  password: string;
}
