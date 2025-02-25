import { DataSource } from 'typeorm';
import { Account } from '../domain/models/account';
import { Car } from '../domain/models/car';
import { Cart } from '../domain/models/cart';
import { Payment } from '../domain/models/payment';
import { Reservation } from '../domain/models/reservation';

export function getPGDS() {
    const dataSource = new DataSource({
        // TODO: These should be env variables.
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'carrental',
        synchronize: true,
        logging: true,
        entities: [Account, Car, Cart, Reservation, Payment],
        subscribers: [],
        migrations: []
    });
    return dataSource;
}
