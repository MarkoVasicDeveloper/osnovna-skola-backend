/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AddTeacherDto from 'Dto/Teacher/Add.teacher.dto';
import { Teacher } from 'entities/Teacher';
import ApiResponse from 'Misc/api.response';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import EditTeacherDto from 'Dto/Teacher/Edit.teacher.dto';
import FindTeacherByEmailDto from 'Dto/Teacher/Find.teacher.email.dto';

@Injectable()
export default class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherService: Repository<Teacher>,
  ) {}

  async addTeacher(data: AddTeacherDto): Promise<Teacher | ApiResponse> {
    try {
      const passwordHashTeacher = this.passwordHash(data.password);
      console.log(passwordHashTeacher);

      const newTeacher = new Teacher();
      newTeacher.name = data.name;
      newTeacher.email = data.email;
      newTeacher.surname = data.surname;
      newTeacher.school = data.school;
      newTeacher.passwordHash = passwordHashTeacher;

      const savedTeacher = await this.teacherService.save(newTeacher);

      if (!savedTeacher)
        return new ApiResponse('error', -1002, 'Server error!');

      return savedTeacher;
    } catch (error) {
      return new ApiResponse('error', -1001, 'Email is taken!');
    }
  }

  async editTeacher(data: EditTeacherDto): Promise<Teacher | ApiResponse> {
    const teacher = await this.teacherService.findOne({ email: data.email });

    if (!teacher)
      return new ApiResponse('error', -1003, 'Teacher is not found!');

    if (data.name) teacher.name = data.name;
    if (data.surname) teacher.surname = data.surname;
    if (data.school) teacher.school = data.school;

    if (data.newPassword) {
      const newPasswordHash = this.passwordHash(data.newPassword);
      teacher.passwordHash = newPasswordHash;
    }

    const editTeacher = await this.teacherService.save(teacher);

    return editTeacher;
  }

  async findTeacherByEmail(
    data: FindTeacherByEmailDto,
  ): Promise<Teacher | ApiResponse> {
    const teacher = await this.teacherService.findOne({ email: data.email });

    if (!teacher)
      return new ApiResponse('error', -1003, 'Teacher is not found!');

    return teacher;
  }

  async findTeacherById(id: number): Promise<Teacher | ApiResponse> {
    const teacher = await this.teacherService.findOne({ teacherId: id });

    if (!teacher)
      return new ApiResponse('error', -1003, 'Teacher is not found!');

    return teacher;
  }

  private passwordHash(password: string) {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(password);
    const passwordHashString = passwordHash
      .digest('hex')
      .toString()
      .toUpperCase();

    return passwordHashString;
  }
}
