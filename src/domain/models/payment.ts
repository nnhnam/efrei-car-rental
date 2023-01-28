import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    JoinColumn
} from 'typeorm';
import { Reservation } from './reservation';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    total!: number;

    @Column()
    paymentMethod!: string;

    @Column()
    paymentDate!: Date;

    @OneToOne(() => Reservation)
    @JoinColumn()
    reservation!: Reservation;
}

export interface PaymentRequestModel {
    paymentMethod: string;
    reservationId: string;
}

export interface PaymentResponseModel {
    paymentId: string;
    total: number;
    paymentMethod: string;
    paymentDate: Date;
    reservationId: string;
}
