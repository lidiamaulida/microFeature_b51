import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { partai } from "./Partai"
import { voters } from "./Voters"

@Entity()
export class paslons {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    nomorUrut: number

    @Column()
    visiMisi: string

    @Column()
    koalisi: string

    @Column({ nullable: true })
    image: string

    @OneToMany(() => voters, (vote) => vote.paslonId, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    vote: voters

    @OneToMany(() => partai, (partai) => partai.paslonId, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    partai: partai[]
}