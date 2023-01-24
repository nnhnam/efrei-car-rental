// domain/use-cases/account/-get-all-accounts.ts
import { Account, AccountResponseModel } from '../../models/account';
import { GetOneAccountUseCase } from '../../interfaces/use-cases/account/get-one-account-use-case';
import { Repository } from 'typeorm';

export class GetOneAccounts implements GetOneAccountUseCase {
    repository: Repository<Account>;
    constructor(repository: Repository<Account>) {
        this.repository = repository;
    }

    async execute(id: string): Promise<AccountResponseModel | null> {
        const account = await this.repository.findOne({
            where: {
                id: id
            }
        });
        return account
            ? {
                  id: account.id,
                  email: account.email,
                  firstName: account.firstName,
                  lastName: account.lastName
              }
            : null;
    }
}
