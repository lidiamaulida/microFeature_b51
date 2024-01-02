import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}