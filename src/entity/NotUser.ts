import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({name: 'NotUser'})
@Unique(["Notemail"])
export class NotUser{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Notemail: string;

    @Column("varchar", { length: 256 })
    name: string;

    @Column()
    password: string;

    @Column({ nullable: true }) 
    otp: string;

    @Column({ nullable: true, type: "timestamp" })
    otpExpiration: Date;

}
