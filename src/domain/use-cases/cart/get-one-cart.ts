// domain/use-cases/cart/-get-all-carts.ts
import { Cart, CartResponseModel } from '../../models/cart';
import { GetOneCartUseCase } from '../../interfaces/use-cases/cart/get-one-cart-use-case';
import { Repository } from 'typeorm';

export class GetOneCart implements GetOneCartUseCase {
    repository: Repository<Cart>;
    constructor(repository: Repository<Cart>) {
        this.repository = repository;
    }

    async execute(id: string): Promise<CartResponseModel | null> {
        const cart = await this.repository.findOne({
            where: {
                id: id
            },
            relations: {
                account: true,
                cars: true
            }
        });
        return cart
            ? {
                  id: cart.id,
                  accountId: cart.account.id,
                  cars: cart.cars
              }
            : null;
    }
}
