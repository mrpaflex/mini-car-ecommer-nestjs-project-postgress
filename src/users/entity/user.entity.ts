import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Exclude()
    @Column()
    password: string;

}