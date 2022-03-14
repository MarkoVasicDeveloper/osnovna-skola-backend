/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import AddTeacherDto from 'Dto/Teacher/Add.teacher.dto';
import EditTeacherDto from 'Dto/Teacher/Edit.teacher.dto';
import FindTeacherByEmailDto from 'Dto/Teacher/Find.teacher.email.dto';
import { Teacher } from 'entities/Teacher';
import ApiResponse from 'Misc/api.response';
import TeacherService from 'src/Services/Teacher/Teacher.service';

@Controller('api')
export default class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('addTeacher')
  async addTeacher(
    @Body() data: AddTeacherDto,
  ): Promise<Teacher | ApiResponse> {
    return await this.teacherService.addTeacher(data);
  }

  @Post('editTeacher')
  async editTeacher(
    @Body() data: EditTeacherDto,
  ): Promise<Teacher | ApiResponse> {
    return await this.teacherService.editTeacher(data);
  }

  @Get('getTeacherById/:id')
  async getTeacherById(
    @Param('id') id: number,
  ): Promise<Teacher | ApiResponse> {
    return await this.teacherService.findTeacherById(id);
  }

  @Post('getTeacherByEmail/')
  async getTeacherByEmail(
    @Body() data: FindTeacherByEmailDto,
  ): Promise<Teacher | ApiResponse> {
    return await this.teacherService.findTeacherByEmail(data);
  }
}
