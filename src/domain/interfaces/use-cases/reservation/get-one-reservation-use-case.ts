import { ReservationResponseModel } from '../../../models/reservation';

export interface GetOneReservationUseCase {
    execute(id: string): Promise<ReservationResponseModel | null>;
}
