import { Car, CarRequestModel } from '../../models/car';
import { Repository } from 'typeorm';
import { CreateCarUseCase } from '../../interfaces/use-cases/car/create-car-use-case';

export class CreateCar implements CreateCarUseCase {
    repository: Repository<Car>;
    constructor(repository: Repository<Car>) {
        this.repository = repository;
    }

    async execute(car: CarRequestModel) {
        const newCar = new Car();
        newCar.brand = car.brand;
        newCar.model = car.model;
        newCar.registrationNum = car.registrationNum;
        newCar.type = car.type;
        const createdCar = await this.repository.save(car);
        return createdCar
            ? {
                  id: createdCar.id,
                  brand: createdCar.brand,
                  model: createdCar.model,
                  registrationNum: createdCar.registrationNum,
                  type: createdCar.type
              }
            : null;
    }
}
