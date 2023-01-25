import { CartRequestModel, CartResponseModel } from '../../../models/cart';

export interface ModifyCartUseCase {
    execute(
        id: string,
        cartRequest: CartRequestModel
    ): Promise<CartResponseModel | null>;
}
