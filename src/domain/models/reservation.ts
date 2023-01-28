import {
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    Column
} from 'typeorm';
import { Account } from './account';
import { Car } from './car';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // Date format YYYY-MM-DD.
    @Column()
    startDate!: string;

    // Date format YYYY-MM-DD.
    @Column()
    endDate!: string;

    @ManyToOne(() => Account)
    account!: Account;

    @ManyToMany(() => Car)
    @JoinTable()
    cars!: Car[];
}

export interface ReservationRequestModel {
    cartId: string;
    // Date format YYYY-MM-DD.
    startDate: string;
    // Date format YYYY-MM-DD.
    endDate: string;
}

export interface ReservationResponseModel {
    reservationId: string;
    // Date format YYYY-MM-DD.
    startDate: string;
    // Date format YYYY-MM-DD.
    endDate: string;
    accountId: string;
    cars: Car[];
}
