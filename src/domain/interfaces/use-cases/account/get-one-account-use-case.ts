import { AccountResponseModel } from "../../../models/account";

export interface GetOneAccountUseCase {
    execute(id: string): Promise<AccountResponseModel | null>;
}