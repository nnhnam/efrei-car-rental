import express from 'express';
import { Request, Response } from 'express';
import { CreateReservationUseCase } from '../../domain/interfaces/use-cases/reservation/create-reservation-use-case';
import { GetAllReservationsUseCase } from '../../domain/interfaces/use-cases/reservation/get-all-reservations-use-case';
import { GetOneReservationUseCase } from '../../domain/interfaces/use-cases/reservation/get-one-reservation-use-case';
import { ReservationRequestModel } from '../../domain/models/reservation';

export default function ReservationsRouter(
    getAllReservationsUseCase: GetAllReservationsUseCase,
    getOneReservationUseCase: GetOneReservationUseCase,
    createReservation: CreateReservationUseCase
) {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
        void (async () => {
            try {
                const reservations = await getAllReservationsUseCase.execute();
                res.send(reservations);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.get('/:id', (req: Request, res: Response) => {
        void (async () => {
            try {
                const reservation = await getOneReservationUseCase.execute(
                    req.params.id
                );
                res.send(reservation);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.post('/', (req: Request, res: Response) => {
        void (async () => {
            try {
                const parseBody = req.body as ReservationRequestModel;
                const reservation = await createReservation.execute(parseBody);
                res.statusCode = 201;
                res.json(reservation);
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: 'Error saving data' });
            }
        })();
    });

    return router;
}
