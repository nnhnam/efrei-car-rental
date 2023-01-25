import { CarResponseModel } from '../../../models/car';

export interface GetAllCarsUseCase {
    execute(): Promise<CarResponseModel[]>;
}
