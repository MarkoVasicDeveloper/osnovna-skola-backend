/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateLessonsDto from 'Dto/Lessons/Create.lessons.dto';
import GetLessonsDto from 'Dto/Lessons/Get.lessons.dto';
import { Lessons } from 'entities/Lessons';
import ApiResponse from 'Misc/api.response';
import { Repository } from 'typeorm';

@Injectable()
export default class LessonsService {
  constructor(
    @InjectRepository(Lessons)
    private readonly lessonsService: Repository<Lessons>,
  ) {}

  async createLessons(data: CreateLessonsDto): Promise<Lessons | ApiResponse> {
    const createLessons = new Lessons();
    createLessons.class = data.class;
    createLessons.schoolSubject = data.schoolSubject;
    createLessons.title = data.title;

    const savedLesson = await this.lessonsService.save(createLessons);

    if (!savedLesson)
      return new ApiResponse('error', -3000, 'Lesson is not saved');

    return savedLesson;
  }

  async getAllLessonsForFrade(
    data: GetLessonsDto,
  ): Promise<Lessons[] | ApiResponse> {
    const getAllLessons = await this.lessonsService.find({
      where: {
        class: data.grade,
        schoolSubject: data.schoolSubject,
      },
    });

    if (!getAllLessons || getAllLessons.length === 0)
      return new ApiResponse('success', 10000, 'Lessons not found');

    return getAllLessons;
  }
}
