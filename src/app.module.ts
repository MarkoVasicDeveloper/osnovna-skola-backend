/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'Config/database.config';
import { Lessons } from 'entities/Lessons';
import { Questions } from 'entities/Questions';
import { Student } from 'entities/Student';
import { Teacher } from 'entities/Teacher';
import LessonsController from './Controllers/Lessons/Lessons.controller';
import QuestionsController from './Controllers/Questions/Questions.controller';
import StudentContoller from './Controllers/Student/Student.controller';
import TeacherController from './Controllers/Teacher/Teacher.controller';
import LessonsService from './Services/Lessons/Lessons.service';
import { QuestionsService } from './Services/Questions/Questions.service';
import StudentService from './Services/Student/Student.service';
import TeacherService from './Services/Teacher/Teacher.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: DatabaseConfig.port,
      database: DatabaseConfig.database,
      password: DatabaseConfig.password,
      username: DatabaseConfig.user,
      entities: [Teacher, Student, Lessons, Questions],
    }),
    TypeOrmModule.forFeature([Teacher, Student, Lessons, Questions]),
  ],
  controllers: [
    TeacherController,
    StudentContoller,
    LessonsController,
    QuestionsController,
  ],
  providers: [TeacherService, StudentService, LessonsService, QuestionsService],
})
export class AppModule {}
