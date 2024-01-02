import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class voters {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    alamat: string

    @Column()
    jenisKelamin: string

    @Column()
    paslon: string

}