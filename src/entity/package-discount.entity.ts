import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';

import { Package } from './coach-package.entity';

@Entity('coach_packages')
export class PackageDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Package, (pack) => pack.discounts, { cascade: true })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  percentage: number;

  @Column({ nullable: false })
  startDate: Timestamp;

  @Column({ nullable: false })
  endDate: Timestamp;
}
