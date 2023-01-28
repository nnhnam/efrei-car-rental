// domain/use-cases/reservation/-get-all-reservations.ts
import {
    Reservation,
    ReservationResponseModel
} from '../../models/reservation';
import { GetOneReservationUseCase } from '../../interfaces/use-cases/reservation/get-one-reservation-use-case';
import { Repository } from 'typeorm';

export class GetOneReservation implements GetOneReservationUseCase {
    repository: Repository<Reservation>;
    constructor(repository: Repository<Reservation>) {
        this.repository = repository;
    }

    async execute(id: string): Promise<ReservationResponseModel | null> {
        const reservation = await this.repository.findOne({
            where: {
                id: id
            },
            relations: {
                account: true,
                cars: true
            }
        });
        return reservation
            ? {
                  reservationId: reservation.id,
                  accountId: reservation.account.id,
                  startDate: reservation.startDate,
                  endDate: reservation.endDate,
                  cars: reservation.cars
              }
            : null;
    }
}
