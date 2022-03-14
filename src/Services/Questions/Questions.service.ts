/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddQuestionsDto } from 'Dto/Questions/Add.questions.dto';
import GetExamQuestionsDto from 'Dto/Questions/Get.exam.questions.dto';
import GetQuestionDto from 'Dto/Questions/Get.question.dto';
import { Questions } from 'entities/Questions';
import ApiResponse from 'Misc/api.response';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsService: Repository<Questions>,
  ) {}

  async createQuestion(
    question: AddQuestionsDto,
  ): Promise<Questions | ApiResponse> {
    const createQuestion = new Questions();
    createQuestion.corectAnswer = question.corectAnswer;
    createQuestion.explanation = question.explanation;
    createQuestion.incorectAnswer_1 = question.incorectAnswer_1;
    createQuestion.incorectAnswer_2 = question.incorectAnswer_2;
    createQuestion.incorectAnswer_3 = question.incorectAnswer_3;
    createQuestion.question = question.question;
    createQuestion.grade = question.grade;
    createQuestion.schoolSubject = question.schoolSubject;
    createQuestion.lesson = question.lesson;

    const savedQuestion = await this.questionsService.save(createQuestion);

    if (!savedQuestion)
      return new ApiResponse('error', -4000, 'Error saving question');

    return savedQuestion;
  }

  async getQuestion(data: GetQuestionDto): Promise<Questions | ApiResponse> {
    const question = await this.questionsService.find({
      where: {
        grade: data.grade,
        lesson: data.lessons,
        schoolSubject: data.schoolSubject,
      },
    });

    if (!question || question.length === 0)
      return new ApiResponse('error', -4001, 'Question not found');
    return question[Math.floor(Math.random() * question.length)];
  }

  async getExamQuestions(
    data: GetExamQuestionsDto,
  ): Promise<Questions[] | ApiResponse> {
    const questions = await this.questionsService.find({
      where: {
        grade: data.grade,
        schoolSubject: data.schoolSubject,
      },
    });

    if (!questions || !questions.length)
      return new ApiResponse('error', -4002, 'Questions is not found!');

    const randomQuestions = [];
    if (questions.length > 10) {
      for (let i = 0; i < 10; i++) {
        randomQuestions.push(
          questions[Math.floor(Math.random() * questions.length)],
        );
      }
    } else {
      return questions;
    }

    return randomQuestions;
  }
}
