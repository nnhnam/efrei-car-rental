import server from './server';
import AccountsRouter from './presentation/routers/account-router';
import { GetAllAccounts } from './domain/use-cases/account/get-all-accounts';
import { CreateAccount } from './domain/use-cases/account/create-account';
import { Account } from './domain/models/account';
import { GetOneAccount } from './domain/use-cases/account/get-one-account';
import { Car } from './domain/models/car';
import { getPGDS } from './data-sources/postgres';
import { getMongoDS } from './data-sources/mongo';
import CarsRouter from './presentation/routers/car-router';
import { GetAllCars } from './domain/use-cases/car/get-all-cars';
import { GetOneCar } from './domain/use-cases/car/get-one-car';
import { CreateCar } from './domain/use-cases/car/create-car';
import CartsRouter from './presentation/routers/cart-router';
import { GetOneCart } from './domain/use-cases/cart/get-one-cart';
import { Cart } from './domain/models/cart';
import { ModifyCart } from './domain/use-cases/cart/modify-cart';
import { GetCartForAccount } from './domain/use-cases/account/get-cart-for-account';

void (async () => {
    const dataSource = getPGDS();
    // To swap database, simply change the data source.
    // const dataSource = getMongoDS();

    await dataSource.initialize();

    const accountRepository = dataSource.getRepository(Account);
    const carRepository = dataSource.getRepository(Car);
    const cartRepository = dataSource.getRepository(Cart);

    const accountMiddleware = AccountsRouter(
        new CreateAccount(accountRepository),
        new GetAllAccounts(accountRepository),
        new GetCartForAccount(accountRepository, cartRepository),
        new GetOneAccount(accountRepository)
    );

    const carMiddleware = CarsRouter(
        new GetAllCars(carRepository),
        new GetOneCar(carRepository),
        new CreateCar(carRepository)
    );

    const cartMiddleware = CartsRouter(
        new GetOneCart(cartRepository),
        new ModifyCart(cartRepository, carRepository)
    );

    server.use('/account', accountMiddleware);
    server.use('/car', carMiddleware);
    server.use('/cart', cartMiddleware);
    server.listen(4000, () => console.log('Running on http://localhost:4000'));
})();
