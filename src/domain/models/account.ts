import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;
}

export interface AccountRequestModel {
    email: string;
    firstName: string;
    lastName: string;
}

export interface AccountResponseModel {
    accountId: string;
    email: string;
    firstName: string;
    lastName: string;
}
