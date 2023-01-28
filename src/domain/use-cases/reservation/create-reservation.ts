// domain/use-cases/cart/-get-all-carts.ts
import { Cart } from '../../models/cart';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateReservationUseCase } from '../../interfaces/use-cases/reservation/create-reservation-use-case';
import {
    Reservation,
    ReservationRequestModel,
    ReservationResponseModel
} from '../../models/reservation';

export class CreateReservation implements CreateReservationUseCase {
    cartRepository: Repository<Cart>;
    reservationRepository: Repository<Reservation>;
    constructor(
        cartRepository: Repository<Cart>,
        reservationRepository: Repository<Reservation>
    ) {
        this.cartRepository = cartRepository;
        this.reservationRepository = reservationRepository;
    }

    isCorrectDateFormat(date: string): boolean {
        // YYYY-MM-DD.
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    }

    async execute(
        reservationRequest: ReservationRequestModel
    ): Promise<ReservationResponseModel | null> {
        if (
            !this.isCorrectDateFormat(reservationRequest.startDate) ||
            !this.isCorrectDateFormat(reservationRequest.endDate)
        ) {
            return null;
        }
        if (
            !Date.parse(reservationRequest.startDate) ||
            !Date.parse(reservationRequest.endDate)
        ) {
            return null;
        }
        if (reservationRequest.startDate > reservationRequest.endDate) {
            return null;
        }

        const cart = await this.cartRepository.findOne({
            where: {
                id: reservationRequest.cartId
            },
            relations: {
                account: true,
                cars: true
            }
        });
        if (!cart) {
            return null;
        }
        // Finds any reservations with an interval overlapping with the request.
        const reservations = await this.reservationRepository.find({
            where: [
                {
                    startDate: Between(
                        reservationRequest.startDate,
                        reservationRequest.endDate
                    )
                },
                {
                    endDate: Between(
                        reservationRequest.startDate,
                        reservationRequest.endDate
                    )
                },
                {
                    startDate: LessThan(reservationRequest.startDate),
                    endDate: MoreThan(reservationRequest.endDate)
                }
            ]
        });

        if (reservations.length) {
            return null;
        }

        const newReservation = new Reservation();
        newReservation.account = cart.account;
        newReservation.cars = cart.cars;
        newReservation.startDate = reservationRequest.startDate;
        newReservation.endDate = reservationRequest.endDate;

        const createdReservation = await this.reservationRepository.save(
            newReservation
        );

        // Clears the cart.
        cart.cars = [];
        await this.cartRepository.save(cart);

        return {
            reservationId: createdReservation.id,
            accountId: newReservation.account.id,
            cars: newReservation.cars,
            startDate: newReservation.startDate,
            endDate: newReservation.endDate
        };
    }
}
