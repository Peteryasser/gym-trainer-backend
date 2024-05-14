import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { DurationUnitEnum } from 'src/packages/duration-unit.enum';
import { Coach } from './coach.entity';

@Entity('coach_packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Coach, { cascade: true })
  coach: Coach;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  duration: number;

  @Column({
    type: 'enum',
    enum: DurationUnitEnum,
    default: DurationUnitEnum.MONTH,
  })
  duration_unit: DurationUnitEnum;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ default: false })
  has_nutrition: boolean;
}
