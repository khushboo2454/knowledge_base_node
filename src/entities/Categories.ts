import { BeforeInsert, Column, Tree, TreeParent, TreeChildren, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Categories {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

}