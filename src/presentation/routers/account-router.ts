import express from 'express';
import { Request, Response } from 'express';
import { CreateAccountUseCase } from '../../domain/interfaces/use-cases/account/create-account-use-case';
import { GetAllAccountsUseCase } from '../../domain/interfaces/use-cases/account/get-all-accounts-use-case';
import { GetOneAccountUseCase } from '../../domain/interfaces/use-cases/account/get-one-account-use-case';
import { AccountRequestModel } from '../../domain/models/account';

export default function AccountsRouter(
    getAllAccountsUseCase: GetAllAccountsUseCase,
    getOneAccountUseCase: GetOneAccountUseCase,
    createAccountUseCase: CreateAccountUseCase
) {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
        try {
            void (async () => {
                const accounts = await getAllAccountsUseCase.execute();
                res.send(accounts);
            })();
        } catch (err) {
            res.status(500).send({ message: 'Error fetching data' });
        }
    });

    router.post('/', (req: Request, res: Response) => {
        try {
            void (async () => {
                await createAccountUseCase.execute(
                    req.body as AccountRequestModel
                );
                res.statusCode = 201;
                res.json({ message: 'Created' });
            })();
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Error saving data' });
        }
    });

    return router;
}
