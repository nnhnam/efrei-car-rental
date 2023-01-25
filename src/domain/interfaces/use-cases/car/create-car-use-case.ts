import { CarRequestModel, CarResponseModel } from '../../../models/car';

export interface CreateCarUseCase {
    execute(car: CarRequestModel): Promise<CarResponseModel | null>;
}
