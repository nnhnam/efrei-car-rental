import { PaymentResponseModel } from '../../../models/payment';

export interface GetAllPaymentsUseCase {
    execute(): Promise<PaymentResponseModel[]>;
}
