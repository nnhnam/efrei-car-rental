import express from 'express';
import { Request, Response } from 'express';
import { CreateCarUseCase } from '../../domain/interfaces/use-cases/car/create-car-use-case';
import { GetAllCarsUseCase } from '../../domain/interfaces/use-cases/car/get-all-cars-use-case';
import { GetOneCarUseCase } from '../../domain/interfaces/use-cases/car/get-one-car-use-case';
import { CarRequestModel } from '../../domain/models/car';

export default function CarsRouter(
    getAllCarsUseCase: GetAllCarsUseCase,
    getOneCarUseCase: GetOneCarUseCase,
    createCarUseCase: CreateCarUseCase
) {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
        void (async () => {
            try {
                const cars = await getAllCarsUseCase.execute();
                res.send(cars);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.get('/:id', (req: Request, res: Response) => {
        void (async () => {
            try {
                const cars = await getOneCarUseCase.execute(req.params.id);
                res.send(cars);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.post('/', (req: Request, res: Response) => {
        void (async () => {
            try {
                const parseBody = req.body as CarRequestModel;
                const car = await createCarUseCase.execute(parseBody);
                res.statusCode = 201;
                res.json(car);
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: 'Error saving data' });
            }
        })();
    });

    return router;
}
