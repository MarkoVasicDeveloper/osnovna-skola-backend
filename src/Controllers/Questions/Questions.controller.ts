/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AddQuestionsDto } from 'Dto/Questions/Add.questions.dto';
import GetExamQuestionsDto from 'Dto/Questions/Get.exam.questions.dto';
import GetQuestionDto from 'Dto/Questions/Get.question.dto';
import { Questions } from 'entities/Questions';
import ApiResponse from 'Misc/api.response';
import { QuestionsService } from 'src/Services/Questions/Questions.service';

@Controller('api')
export default class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Post('addQuestion')
  async addQuestions(
    @Body() question: AddQuestionsDto,
  ): Promise<Questions | ApiResponse> {
    return await this.questionService.createQuestion(question);
  }

  @Post('getQuestion')
  async getQuestion(
    @Body() question: GetQuestionDto,
  ): Promise<Questions | ApiResponse> {
    return await this.questionService.getQuestion(question);
  }

  @Post('getExamQuestions')
  async getExamQuestions(
    @Body() data: GetExamQuestionsDto,
  ): Promise<Questions[] | ApiResponse> {
    return await this.questionService.getExamQuestions(data);
  }
}
