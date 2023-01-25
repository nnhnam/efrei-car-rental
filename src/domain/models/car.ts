import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    registrationNum!: string;

    @Column()
    brand!: string;

    @Column()
    model!: string;

    @Column()
    type!: string;
}

export interface CarRequestModel {
    registrationNum: string;
    brand: string;
    model: string;
    type: string;
}

export interface CarResponseModel {
    id: string;
    registrationNum: string;
    brand: string;
    model: string;
    type: string;
}
