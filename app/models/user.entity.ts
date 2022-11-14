import {Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
import {IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import "reflect-metadata";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({ unique: true })
  @IsEmail({ massage: "Please enter a valid email" })
  @IsNotEmpty({ message: "Please enter an email" })
  email: string;

  @Column()
  @IsNotEmpty({ message: "Please enter a password" })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      const salt = await bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    } catch (error) {
      console.log(error);
    }
  }
}
