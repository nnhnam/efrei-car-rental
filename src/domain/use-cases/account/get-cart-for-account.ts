// domain/use-cases/account/-get-all-accounts.ts
import { Account } from '../../models/account';
import { Repository } from 'typeorm';
import { GetCartForAccountUseCase } from '../../interfaces/use-cases/account/get-cart-for-account-use-case';
import { Cart, CartResponseModel } from '../../models/cart';

export class GetCartForAccount implements GetCartForAccountUseCase {
    accountRepository: Repository<Account>;
    cartRepository: Repository<Cart>;
    constructor(
        accountRepository: Repository<Account>,
        cartRepository: Repository<Cart>
    ) {
        this.accountRepository = accountRepository;
        this.cartRepository = cartRepository;
    }

    async execute(id: string): Promise<CartResponseModel | null> {
        const account = await this.accountRepository.findOne({
            where: {
                id: id
            }
        });
        if (!account) {
            return null;
        }
        let cart = await this.cartRepository
            .createQueryBuilder('cart')
            .leftJoinAndSelect('cart.account', 'account', 'account.id = :id', {
                id: id
            })
            .getOne();
        if (!cart) {
            cart = new Cart();
            cart.account = account;
            cart.cars = [];
        }
        const createdCart = await this.cartRepository.save(cart);
        return {
            cartId: createdCart.id,
            accountId: createdCart.account.id,
            cars: createdCart.cars
        };
    }
}
