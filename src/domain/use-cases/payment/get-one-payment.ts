// domain/use-cases/payment/-get-all-payments.ts
import { Payment, PaymentResponseModel } from '../../models/payment';
import { GetOnePaymentUseCase } from '../../interfaces/use-cases/payment/get-one-payment-use-case';
import { Repository } from 'typeorm';

export class GetOnePayment implements GetOnePaymentUseCase {
    repository: Repository<Payment>;
    constructor(repository: Repository<Payment>) {
        this.repository = repository;
    }

    async execute(id: string): Promise<PaymentResponseModel | null> {
        const payment = await this.repository.findOne({
            where: {
                id: id
            },
            relations: {
                reservation: true
            }
        });
        return payment
            ? {
                  paymentId: payment.id,
                  total: payment.total,
                  paymentMethod: payment.paymentMethod,
                  paymentDate: payment.paymentDate,
                  reservationId: payment.reservation.id
              }
            : null;
    }
}
