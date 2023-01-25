import { CartResponseModel } from '../../../models/cart';

export interface GetOneCartUseCase {
    execute(id: string): Promise<CartResponseModel | null>;
}
