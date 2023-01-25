import server from './server';
import AccountsRouter from './presentation/routers/account-router';
import { GetAllAccounts } from './domain/use-cases/account/get-all-accounts';
import { CreateAccount } from './domain/use-cases/account/create-account';
import { DataSource } from 'typeorm';
import { Account } from './domain/models/account';
import { GetOneAccount } from './domain/use-cases/account/get-one-account';
import { Car } from './domain/models/car';
import { getPGDS } from './data-sources/postgres';
import { getMongoDS } from './data-sources/mongo';
import CarsRouter from './presentation/routers/car-router';
import { GetAllCars } from './domain/use-cases/car/get-all-cars';
import { GetOneCar } from './domain/use-cases/car/get-one-car';
import { CreateCar } from './domain/use-cases/car/create-car';

void (async () => {
    const dataSource = getPGDS();
    // To swap database, simply change the data source.
    // const dataSource = getMongoDS();

    await dataSource.initialize();

    const accountMiddleware = AccountsRouter(
        new GetAllAccounts(dataSource.getRepository(Account)),
        new GetOneAccount(dataSource.getRepository(Account)),
        new CreateAccount(dataSource.getRepository(Account))
    );

    const carMiddleware = CarsRouter(
        new GetAllCars(dataSource.getRepository(Car)),
        new GetOneCar(dataSource.getRepository(Car)),
        new CreateCar(dataSource.getRepository(Car))
    );

    server.use('/account', accountMiddleware);
    server.use('/car', carMiddleware);
    server.listen(4000, () => console.log('Running on http://localhost:4000'));
})();
