import {
    AccountRequestModel,
    AccountResponseModel
} from '../../../models/account';

export interface CreateAccountUseCase {
    execute(account: AccountRequestModel): Promise<AccountResponseModel | null>;
}
