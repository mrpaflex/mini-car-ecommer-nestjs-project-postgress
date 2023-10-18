import { UserEntity } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserReports{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    model: string

    @Column({default: false})
    approved: boolean

    @Column()
    mileage: number

    @Column()
    lat: number;
    @Column()
    lng: number

    @Column()
    year: number;
    @Column()
    make: string;

    @Column({type: 'datetime', default: ()=> 'current_timestamp'})
    createdAt: Date

    //relationship or associate

    @ManyToOne(()=> UserEntity, (user)=>user.reports)
    user: UserEntity

}