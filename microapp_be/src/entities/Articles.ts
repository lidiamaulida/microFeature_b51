import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "articles" })
export class articles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column("date")
    date: string

    @Column()
    author: string

    @Column()
    image: string

}