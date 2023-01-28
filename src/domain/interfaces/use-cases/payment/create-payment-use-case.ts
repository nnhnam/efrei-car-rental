import {
    PaymentRequestModel,
    PaymentResponseModel
} from '../../../models/payment';

export interface CreatePaymentUseCase {
    execute(
        paymentRequest: PaymentRequestModel
    ): Promise<PaymentResponseModel | null>;
}
