import express from 'express';
import { Request, Response } from 'express';
import { ModifyCartUseCase } from '../../domain/interfaces/use-cases/cart/modify-cart-use-case';
import { GetOneCartUseCase } from '../../domain/interfaces/use-cases/cart/get-one-cart-use-case';
import { CartRequestModel } from '../../domain/models/cart';

export default function CartsRouter(
    getOneCartUseCase: GetOneCartUseCase,
    modifyCartUseCase: ModifyCartUseCase
) {
    const router = express.Router();

    router.get('/:id', (req: Request, res: Response) => {
        void (async () => {
            try {
                const carts = await getOneCartUseCase.execute(req.params.id);
                res.send(carts);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching data' });
            }
        })();
    });

    router.post('/:id', (req: Request, res: Response) => {
        void (async () => {
            try {
                const id = req.params.id;
                const parseBody = req.body as CartRequestModel;
                const cart = await modifyCartUseCase.execute(id, parseBody);
                res.statusCode = 200;
                res.json(cart);
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: 'Error saving data' });
            }
        })();
    });

    return router;
}
