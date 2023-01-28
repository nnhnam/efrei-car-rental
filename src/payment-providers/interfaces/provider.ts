import {
    PaymentRequestModel,
    PaymentResponseModel
} from '../../domain/models/payment';

export interface PaymentProvider {
    execute(
        amount: number,
        paymentRequest: PaymentRequestModel
    ): Promise<boolean>;
}
