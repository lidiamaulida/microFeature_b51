import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}