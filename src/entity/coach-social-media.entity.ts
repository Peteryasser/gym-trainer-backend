import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Coach } from './coach.entity';
import { SocialMediaSourceEnum } from 'src/coach_social_media/enums/social-media-source.enum';

@Entity('coach_social_media_accounts')
export class CoachSocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.notifications, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'coachId' })
  coach: Coach;

  @Column({
    type: 'enum',
    enum: SocialMediaSourceEnum,
    nullable: false,
  })
  source: SocialMediaSourceEnum;

  @Column({ type: 'varchar', length: 255 })
  accountUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
