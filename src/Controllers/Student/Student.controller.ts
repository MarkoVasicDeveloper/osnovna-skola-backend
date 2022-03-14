/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import AddStudentDto from 'Dto/Student/Add.student.dto';
import EditStudentDto from 'Dto/Student/Edit.student.dto';
import GetStudentBySchool from 'Dto/Student/Get.student.school';
import { Student } from 'entities/Student';
import ApiResponse from 'Misc/api.response';
import StudentService from 'src/Services/Student/Student.service';

@Controller('api')
export default class StudentContoller {
  constructor(private readonly studentService: StudentService) {}

  @Post('addStudent')
  async addStudent(
    @Body() data: AddStudentDto,
  ): Promise<Student | ApiResponse> {
    return await this.studentService.addStudent(data);
  }

  @Post('editStudent/:id')
  async editStudent(
    @Body() data: EditStudentDto,
    @Param('id') id: number,
  ): Promise<Student | ApiResponse> {
    return await this.studentService.editStudent(data, id);
  }

  @Get('getStudentById/:id')
  async getStudentById(
    @Param('id') id: number,
  ): Promise<Student | ApiResponse> {
    return await this.studentService.findStudentById(id);
  }

  @Post('getStudentBySchool')
  async getStudentBySchool(
    @Body() data: GetStudentBySchool,
  ): Promise<Student | ApiResponse> {
    return await this.studentService.findStudentBySchool(data.school);
  }
}
