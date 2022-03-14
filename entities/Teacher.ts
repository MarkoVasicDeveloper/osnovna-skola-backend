import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("email", ["email"], { unique: true })
@Entity("teacher", { schema: "osnovna_skola" })
export class Teacher {
  @PrimaryGeneratedColumn({ type: "int", name: "teacher_id", unsigned: true })
  teacherId: number;

  @Column("varchar", {
    name: "password_hash",
    length: 255,
    default: () => "'0'",
  })
  passwordHash: string;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 50,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", { name: "school", length: 128, default: () => "'0'" })
  school: string;

  @Column("varchar", { name: "surname", length: 50 })
  surname: string;
}
