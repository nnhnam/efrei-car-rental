// domain/use-cases/payment/-get-all-payments.ts
import { Payment, PaymentResponseModel } from '../../models/payment';
import { GetAllPaymentsUseCase } from '../../interfaces/use-cases/payment/get-all-payments-use-case';
import { Repository } from 'typeorm';

export class GetAllPayments implements GetAllPaymentsUseCase {
    repository: Repository<Payment>;
    constructor(repository: Repository<Payment>) {
        this.repository = repository;
    }

    async execute(): Promise<PaymentResponseModel[]> {
        const allPayments = await this.repository.find({
            relations: {
                reservation: true
            }
        });
        return allPayments.map((payment) => {
            return {
                paymentId: payment.id,
                total: payment.total,
                paymentMethod: payment.paymentMethod,
                paymentDate: payment.paymentDate,
                reservationId: payment.reservation.id
            };
        });
    }
}
