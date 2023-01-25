import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    JoinTable,
    ManyToMany
} from 'typeorm';
import { Account } from './account';
import { Car } from './car';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => Account)
    @JoinColumn()
    account!: Account;

    @ManyToMany(() => Car)
    @JoinTable()
    cars!: Car[];
}

export interface CartRequestModel {
    carIds: string[];
}

export interface CartResponseModel {
    id: string;
    accountId: string;
    cars: Car[];
}
