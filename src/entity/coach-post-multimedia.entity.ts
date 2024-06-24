import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CoachPost } from './coach-post.entity';
import { MultimediaTypeEnum } from 'src/coach_posts/multimedia/enum/multimedia-type.enum';

@Entity('coach_posts_multimedia')
export class CoachPostMultimedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  postId: number;

  @Column({ nullable: false })
  multimedia_url: string;

  @Column({ nullable: false })
  type: MultimediaTypeEnum;

  @ManyToOne(() => CoachPost, (post) => post.multimedia, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: CoachPost;

  @CreateDateColumn()
  createdAt: Date;
}
