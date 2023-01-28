import { PaymentProvider } from './interfaces/provider';
import { setTimeout } from 'timers/promises';
import { PaymentRequestModel } from '../domain/models/payment';

export class CreditCardProvider implements PaymentProvider {
    async execute(
        amount: number,
        paymentRequest: PaymentRequestModel
    ): Promise<boolean> {
        await setTimeout(1);
        if (paymentRequest.paymentMethod === 'visa') {
            console.log('Payment succeeds');
            return true;
        }
        console.log('Payment fails');
        return false;
    }
}
