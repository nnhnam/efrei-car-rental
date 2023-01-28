import { ReservationResponseModel } from '../../../models/reservation';

export interface GetAllReservationsUseCase {
    execute(): Promise<ReservationResponseModel[]>;
}
