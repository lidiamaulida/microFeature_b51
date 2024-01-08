import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { paslons } from "./Paslon"

@Entity()
export class voters {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, (user) => user.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user : User

    @ManyToOne(() => paslons , (paslonId) => paslonId.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    paslonId : paslons

}