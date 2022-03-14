/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions', { schema: 'osnovna_skola' })
export class Questions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'question_id', unsigned: true })
  questionId: number;

  @Column('int', { name: 'grade', default: () => "'0'" })
  grade: number;

  @Column('varchar', {
    name: 'school_subject',
    length: 50,
    default: () => "'0'",
  })
  schoolSubject: string;

  @Column('varchar', { name: 'lesson', length: 50, default: () => "'0'" })
  lesson: string;

  @Column('varchar', { name: 'question', length: 255, default: () => "'0'" })
  question: string;

  @Column('varchar', {
    name: 'corect_answer',
    length: 50,
    default: () => "'0'",
  })
  corectAnswer: string;

  @Column('varchar', {
    name: 'incorect_answer_1',
    length: 50,
    default: () => "'0'",
  })
  incorectAnswer_1: string;

  @Column('varchar', {
    name: 'incorect_answer_2',
    length: 50,
    default: () => "'0'",
  })
  incorectAnswer_2: string;

  @Column('varchar', {
    name: 'incorect_answer_3',
    length: 50,
    default: () => "'0'",
  })
  incorectAnswer_3: string;

  @Column('varchar', { name: 'explanation', length: 255, default: () => "'0'" })
  explanation: string;
}
