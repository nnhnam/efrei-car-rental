import { AccountResponseModel } from "../../../models/account";

export interface GetAllAccountsUseCase {
    execute(): Promise<AccountResponseModel[]>;
}