import { Cart, CartRequestModel } from '../../models/cart';
import { In, Repository } from 'typeorm';
import { ModifyCartUseCase } from '../../interfaces/use-cases/cart/modify-cart-use-case';
import { Car } from '../../models/car';

export class ModifyCart implements ModifyCartUseCase {
    cartRepository: Repository<Cart>;
    carRepository: Repository<Car>;
    constructor(
        cartRepository: Repository<Cart>,
        carRepository: Repository<Car>
    ) {
        this.cartRepository = cartRepository;
        this.carRepository = carRepository;
    }

    async execute(id: string, cartRequest: CartRequestModel) {
        const cart = await this.cartRepository.findOne({
            where: {
                id: id
            },
            relations: {
                account: true,
                cars: true
            }
        });
        if (!cart) {
            return null;
        }
        const updatedCars = await this.carRepository.findBy({
            id: In(cartRequest.carIds)
        });
        cart.cars = updatedCars;
        await this.cartRepository.save(cart);
        return {
            cartId: cart.id,
            accountId: cart.account.id,
            cars: cart.cars
        };
    }
}
