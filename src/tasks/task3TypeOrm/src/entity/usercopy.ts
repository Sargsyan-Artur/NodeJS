import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserCopy {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstopy!: string

    @Column()
    lastNopy!: string

    @Column()
    ageopy!: number
}
