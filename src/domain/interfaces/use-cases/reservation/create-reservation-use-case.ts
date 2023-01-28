import {
    ReservationRequestModel,
    ReservationResponseModel
} from '../../../models/reservation';

export interface CreateReservationUseCase {
    execute(
        reservationRequest: ReservationRequestModel
    ): Promise<ReservationResponseModel | null>;
}
