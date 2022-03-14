import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("student", { schema: "osnovna_skola" })
export class Student {
  @PrimaryGeneratedColumn({ type: "int", name: "student_id", unsigned: true })
  studentId: number;

  @Column("varchar", { name: "school", length: 128, default: () => "'0'" })
  school: string;

  @Column("varchar", { name: "name", length: 50 })
  name: string;
}
