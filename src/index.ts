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
import { CreateReservation } from './domain/use-cases/reservation/create-reservation';
import { Reservation } from './domain/models/reservation';
import { Payment } from './domain/models/payment';
import { GetAllReservations } from './domain/use-cases/reservation/get-all-reservations';
import { GetOneReservation } from './domain/use-cases/reservation/get-one-reservation';
import ReservationsRouter from './presentation/routers/reservation-router';
import { CreditCardProvider } from './payment-providers/credit-card-provider';
import PaymentsRouter from './presentation/routers/payment-router';
import { GetAllPayments } from './domain/use-cases/payment/get-all-payments';
import { GetOnePayment } from './domain/use-cases/payment/get-one-payment';
import { CreatePayment } from './domain/use-cases/payment/create-payment';
import { GmailProvider } from './email-providers/gmail-provider';

void (async () => {
    const dataSource = getPGDS();
    // To swap database, simply change the data source.
    // const dataSource = getMongoDS();

    await dataSource.initialize();

    const accountRepository = dataSource.getRepository(Account);
    const carRepository = dataSource.getRepository(Car);
    const cartRepository = dataSource.getRepository(Cart);
    const reservationRepository = dataSource.getRepository(Reservation);
    const paymentRepository = dataSource.getRepository(Payment);

    const creditCardProvider = new CreditCardProvider();

    const gmailProvider = new GmailProvider();

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

    const reservationMiddleware = ReservationsRouter(
        new GetAllReservations(reservationRepository),
        new GetOneReservation(reservationRepository),
        new CreateReservation(cartRepository, reservationRepository)
    );

    const paymentMiddleware = PaymentsRouter(
        new GetAllPayments(paymentRepository),
        new GetOnePayment(paymentRepository),
        new CreatePayment(
            reservationRepository,
            paymentRepository,
            creditCardProvider,
            gmailProvider
        )
    );

    server.use('/account', accountMiddleware);
    server.use('/car', carMiddleware);
    server.use('/cart', cartMiddleware);
    server.use('/reservation', reservationMiddleware);
    server.use('/payment', paymentMiddleware);
    server.listen(4000, () => console.log('Running on http://localhost:4000'));
})();
