import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    alamat: string

    @Column()
    username: string

    @Column()
    password: string

}
