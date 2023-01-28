// domain/use-cases/car/-get-all-cars.ts
import { Car, CarResponseModel } from '../../models/car';
import { GetOneCarUseCase } from '../../interfaces/use-cases/car/get-one-car-use-case';
import { Repository } from 'typeorm';

export class GetOneCar implements GetOneCarUseCase {
    repository: Repository<Car>;
    constructor(repository: Repository<Car>) {
        this.repository = repository;
    }

    async execute(id: string): Promise<CarResponseModel | null> {
        const car = await this.repository.findOne({
            where: {
                id: id
            }
        });
        return car
            ? {
                  carId: car.id,
                  brand: car.brand,
                  model: car.model,
                  registrationNum: car.registrationNum,
                  type: car.type,
                  price: car.price
              }
            : null;
    }
}
