import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CoachPost } from './coach-post.entity';

@Entity('coach_posts_likes')
export class CoachPostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  postId: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => CoachPost, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: CoachPost;

  @CreateDateColumn()
  createdAt: Date;
}
