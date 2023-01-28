import express from 'express';
import { Request, Response } from 'express';
import { GetAllPaymentsUseCase } from '../../domain/interfaces/use-cases/payment/get-all-payments-use-case';
import { GetOnePaymentUseCase } from '../../domain/interfaces/use-cases/payment/get-one-payment-use-case';
import { PaymentRequestModel } from '../../domain/models/payment';
import { CreatePaymentUseCase } from '../../domain/interfaces/use-cases/payment/create-payment-use-case';

export default function PaymentsRouter(
    getAllPaymentsUseCase: GetAllPaymentsUseCase,
    getOnePaymentUseCase: GetOnePaymentUseCase,
    createPayment: CreatePaymentUseCase
) {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
        void (async () => {
            try {
                const payments = await getAllPaymentsUseCase.execute();
                res.send(payments);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.get('/:id', (req: Request, res: Response) => {
        void (async () => {
            try {
                const payment = await getOnePaymentUseCase.execute(
                    req.params.id
                );
                res.send(payment);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.post('/', (req: Request, res: Response) => {
        void (async () => {
            try {
                const parseBody = req.body as PaymentRequestModel;
                const payment = await createPayment.execute(parseBody);
                res.statusCode = 201;
                res.json(payment);
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: 'Error saving data' });
            }
        })();
    });

    return router;
}
