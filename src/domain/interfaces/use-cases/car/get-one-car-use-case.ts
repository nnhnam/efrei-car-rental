import { CarResponseModel } from '../../../models/car';

export interface GetOneCarUseCase {
    execute(id: string): Promise<CarResponseModel | null>;
}
