import { BeforeInsert, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Index, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('email_IDX', { unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  googleId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  static async setPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  @BeforeInsert()
  async encryptPassword() {
    if (this.password)
      this.password = await bcrypt.hash(this.password, 10);
  }
}