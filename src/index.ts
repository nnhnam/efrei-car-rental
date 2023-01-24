import server from './server';
import AccountsRouter from './presentation/routers/account-router';
import { GetAllAccounts } from './domain/use-cases/account/get-all-accounts';
import { CreateAccount } from './domain/use-cases/account/create-account';
import { DataSource } from 'typeorm';
import { Account } from './domain/models/account';
import { GetOneAccounts } from './domain/use-cases/account/get-one-account';

function getMongoDS() {
    throw new Error('Method not implemented.');
}

function getPGDS() {
    const dataSource = new DataSource({
        // TODO: These should be env variables.
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'carrental',
        synchronize: true,
        logging: true,
        entities: [Account],
        subscribers: [],
        migrations: []
    });
    return dataSource;
}

void (async () => {
    const dataSource = getPGDS();
    // To swap database, simply change the data source.
    // const dataSource = getMongoDS();

    await dataSource.initialize();

    const accountMiddleware = AccountsRouter(
        new GetAllAccounts(dataSource.getRepository(Account)),
        new GetOneAccounts(dataSource.getRepository(Account)),
        new CreateAccount(dataSource.getRepository(Account))
    );

    server.use('/account', accountMiddleware);
    server.listen(4000, () => console.log('Running on http://localhost:4000'));
})();
