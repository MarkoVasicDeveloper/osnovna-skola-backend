/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import CreateLessonsDto from 'Dto/Lessons/Create.lessons.dto';
import GetLessonsDto from 'Dto/Lessons/Get.lessons.dto';
import { Lessons } from 'entities/Lessons';
import ApiResponse from 'Misc/api.response';
import LessonsService from 'src/Services/Lessons/Lessons.service';

@Controller('api')
export default class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('getAllLessonsByGrade')
  async getAllLessonsByGrade(
    @Body() data: GetLessonsDto,
  ): Promise<Lessons[] | ApiResponse> {
    return await this.lessonsService.getAllLessonsForFrade(data);
  }

  @Post('createLesson')
  async createLesson(
    @Body() data: CreateLessonsDto,
  ): Promise<Lessons | ApiResponse> {
    return await this.lessonsService.createLessons(data);
  }
}
