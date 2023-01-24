// domain/use-cases/account/-get-all-accounts.ts
import { Account, AccountResponseModel } from '../../models/account';
import { GetAllAccountsUseCase } from '../../interfaces/use-cases/account/get-all-accounts-use-case';
import { Repository } from 'typeorm';

export class GetAllAccounts implements GetAllAccountsUseCase {
    repository: Repository<Account>;
    constructor(repository: Repository<Account>) {
        this.repository = repository;
    }

    async execute(): Promise<AccountResponseModel[]> {
        const allAccounts = await this.repository.find();
        return allAccounts.map((account) => {
            return {
                id: account.id,
                email: account.email,
                firstName: account.firstName,
                lastName: account.lastName
            };
        });
    }
}
