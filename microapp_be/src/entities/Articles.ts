import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({ name: "articles" })
export class articles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column("date", { nullable: true })
    date: string

    @Column({ nullable: true })
    author: string

    @Column()
    image: string

    @ManyToOne(() => User, (user) => user.article)
    user: User
}