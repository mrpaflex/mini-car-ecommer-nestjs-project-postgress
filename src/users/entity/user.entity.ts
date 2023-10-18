import { Exclude } from "class-transformer";
import { UserReports } from "src/report/entity/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({default: true})
    admin: boolean
    
    // @Exclude()
    @Column()
    password: string;

    //relationship or associate

    @OneToMany(()=> UserReports, (report)=> report.user )
    reports: UserReports[]


}
