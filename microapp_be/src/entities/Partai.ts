import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { paslons } from "./Paslon"

@Entity()
export class partai {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    ketuaUmum: string

    @Column()
    visiMisi: string

    @Column()
    alamat: string

    @Column()
    image: string

    @ManyToOne(() => paslons, (paslon) => paslon.partai)
    paslonId : paslons
}