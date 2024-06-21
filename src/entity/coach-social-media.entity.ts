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
import { SocialMediaPlatformEnum } from 'src/coach_social_media/enums/social-media-platform.enum';

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
    enum: SocialMediaPlatformEnum,
    nullable: false,
  })
  platform: SocialMediaPlatformEnum;

  @Column({ type: 'varchar', length: 255 })
  handle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
