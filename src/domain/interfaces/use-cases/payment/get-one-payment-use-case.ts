import { PaymentResponseModel } from '../../../models/payment';

export interface GetOnePaymentUseCase {
    execute(id: string): Promise<PaymentResponseModel | null>;
}
