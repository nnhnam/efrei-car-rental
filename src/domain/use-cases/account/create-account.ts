import { Account, AccountRequestModel } from '../../models/account';
import { Repository } from 'typeorm';
import { CreateAccountUseCase } from '../../interfaces/use-cases/account/create-account-use-case';

export class CreateAccount implements CreateAccountUseCase {
    repository: Repository<Account>;
    constructor(repository: Repository<Account>) {
        this.repository = repository;
    }

    async execute(account: AccountRequestModel) {
        const newAccount = new Account();
        newAccount.email = account.email;
        newAccount.firstName = account.firstName;
        newAccount.lastName = account.lastName;
        const createdAccount = await this.repository.save(account);
        return createdAccount
            ? {
                  id: createdAccount.id,
                  email: createdAccount.email,
                  firstName: createdAccount.firstName,
                  lastName: createdAccount.lastName
              }
            : null;
    }
}
