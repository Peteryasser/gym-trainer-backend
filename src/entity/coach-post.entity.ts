import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Coach } from './coach.entity';
import { CoachPostLike } from './coach-post-like.entity';
import { CoachPostMultimedia } from './coach-post-multimedia.entity';

@Entity('coach_posts')
export class CoachPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  coachId: number;

  @Column({ nullable: false })
  body: string;

  @ManyToOne(() => Coach, (coach) => coach.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'coachId' })
  coach: Coach;

  @OneToMany(() => CoachPostLike, (likes) => likes.post)
  likes: CoachPostLike[];

  @OneToMany(() => CoachPostMultimedia, (multimedia) => multimedia.post)
  multimedia: CoachPostMultimedia[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
