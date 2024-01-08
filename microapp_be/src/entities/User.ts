import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { articles } from "./Articles"
import { voters } from "./Voters"

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

    @Column({ default: "user" })
    role: string;

    @OneToMany(() => articles, (article) => article.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      })
      article: articles[]

    @OneToOne(() => voters, (vote) => vote.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      })
      vote: voters
}
