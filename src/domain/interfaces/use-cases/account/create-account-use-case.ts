import { AccountRequestModel } from '../../../models/account';

export interface CreateAccountUseCase {
    execute(account: AccountRequestModel): Promise<void>;
}
