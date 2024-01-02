import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    address: string

    @Column()
    gender: string

    @Column()
    username: string

    @Column()
    password: string

}
