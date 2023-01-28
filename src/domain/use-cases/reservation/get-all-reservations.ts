// domain/use-cases/reservation/-get-all-reservations.ts
import {
    Reservation,
    ReservationResponseModel
} from '../../models/reservation';
import { GetAllReservationsUseCase } from '../../interfaces/use-cases/reservation/get-all-reservations-use-case';
import { Repository } from 'typeorm';

export class GetAllReservations implements GetAllReservationsUseCase {
    repository: Repository<Reservation>;
    constructor(repository: Repository<Reservation>) {
        this.repository = repository;
    }

    async execute(): Promise<ReservationResponseModel[]> {
        const allReservations = await this.repository.find({
            relations: {
                account: true,
                cars: true
            }
        });
        return allReservations.map((reservation) => {
            return {
                reservationId: reservation.id,
                accountId: reservation.account.id,
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                cars: reservation.cars
            };
        });
    }
}
