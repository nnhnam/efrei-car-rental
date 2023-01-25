// domain/use-cases/car/-get-all-cars.ts
import { Car, CarResponseModel } from '../../models/car';
import { GetAllCarsUseCase } from '../../interfaces/use-cases/car/get-all-cars-use-case';
import { Repository } from 'typeorm';

export class GetAllCars implements GetAllCarsUseCase {
    repository: Repository<Car>;
    constructor(repository: Repository<Car>) {
        this.repository = repository;
    }

    async execute(): Promise<CarResponseModel[]> {
        const allCars = await this.repository.find();
        return allCars.map((car) => {
            return {
                id: car.id,
                brand: car.brand,
                model: car.model,
                registrationNum: car.registrationNum,
                type: car.type
            };
        });
    }
}
