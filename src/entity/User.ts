import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({name: 'User'})
@Unique(["email"])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column("varchar", { length: 256 })
    name: string;

    @Column()
    password: string;

    @Column({ nullable: true }) // Nullable because OTP might not be set initially
    otp: string;

    @Column({ nullable: true, type: "timestamp" }) // Nullable because OTP expiration might not be set initially
    otpExpiration: Date;

}
