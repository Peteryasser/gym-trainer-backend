import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Package } from './coach-package.entity';

@Entity('package_discounts')
export class PackageDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Package, (pack) => pack.discounts)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  percentage: number;

  @Column({ nullable: false })
  startDate: Date;

  @Column({ nullable: false })
  endDate: Date;
}
