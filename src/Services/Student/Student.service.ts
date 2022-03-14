/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AddStudentDto from 'Dto/Student/Add.student.dto';
import EditStudentDto from 'Dto/Student/Edit.student.dto';
import { Student } from 'entities/Student';
import ApiResponse from 'Misc/api.response';
import { Repository } from 'typeorm';

@Injectable()
export default class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentServuce: Repository<Student>,
  ) {}

  async addStudent(data: AddStudentDto): Promise<Student | ApiResponse> {
    const student = await this.studentServuce.findOne({
      school: data.school,
      name: data.name,
    });
    if (student)
      return new ApiResponse('error', -2003, 'Student alredy exists');

    const newStudent = new Student();
    newStudent.school = data.school;
    newStudent.name = data.name;

    return await this.studentServuce.save(newStudent);
  }

  async editStudent(
    data: EditStudentDto,
    id: number,
  ): Promise<Student | ApiResponse> {
    const student = await this.studentServuce.findOne({
      studentId: id,
    });

    if (!student)
      return new ApiResponse('error', -2002, 'Student is not found');
    if (data.name) student.name = data.name;
    if (data.school) student.school = data.school;
    return await this.studentServuce.save(student);
  }

  async findStudentById(studentId: number): Promise<Student | ApiResponse> {
    const student = await this.studentServuce.findOne({ studentId: studentId });
    if (!student)
      return new ApiResponse('error', -2002, 'Student is not found');
    return student;
  }

  async findStudentBySchool(school: string): Promise<Student | ApiResponse> {
    const student = await this.studentServuce.findOne({ school: school });
    if (!student)
      return new ApiResponse('error', -2002, 'Student is not found');
    return student;
  }
}
