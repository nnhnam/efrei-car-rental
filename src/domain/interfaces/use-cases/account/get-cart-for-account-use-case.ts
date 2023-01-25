import { CartResponseModel } from '../../../models/cart';

export interface GetCartForAccountUseCase {
    execute(accountId: string): Promise<CartResponseModel | null>;
}
