import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("lessons", { schema: "osnovna_skola" })
export class Lessons {
  @PrimaryGeneratedColumn({ type: "int", name: "lessons_id", unsigned: true })
  lessonsId: number;

  @Column("varchar", {
    name: "school_subject",
    length: 50,
    default: () => "'0'",
  })
  schoolSubject: string;

  @Column("varchar", { name: "class", length: 1, default: () => "'5'" })
  class: string;

  @Column("varchar", { name: "title", length: 255 })
  title: string;
}
