import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserReports{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}