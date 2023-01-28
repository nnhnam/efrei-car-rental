import { Reservation } from '../../models/reservation';
import { Repository } from 'typeorm';
import { Payment, PaymentRequestModel } from '../../models/payment';
import { PaymentProvider } from '../../../payment-providers/interfaces/provider';
import { CreatePaymentUseCase } from '../../interfaces/use-cases/payment/create-payment-use-case';
import { EmailProvider } from '../../../email-providers/interfaces/provider';

export class CreatePayment implements CreatePaymentUseCase {
    reservationRepository: Repository<Reservation>;
    paymentRepository: Repository<Payment>;
    paymentProvider: PaymentProvider;
    emailProvider: EmailProvider;
    constructor(
        reservationRepository: Repository<Reservation>,
        paymentRepository: Repository<Payment>,
        paymentProvider: PaymentProvider,
        emailProvider: EmailProvider
    ) {
        this.reservationRepository = reservationRepository;
        this.paymentRepository = paymentRepository;
        this.paymentProvider = paymentProvider;
        this.emailProvider = emailProvider;
    }

    async execute(paymentRequest: PaymentRequestModel) {
        const reservation = await this.reservationRepository.findOne({
            where: {
                id: paymentRequest.reservationId
            },
            relations: {
                account: true,
                cars: true
            }
        });
        if (!reservation) {
            return null;
        }
        const startDate = Date.parse(reservation.startDate);
        const endDate = Date.parse(reservation.endDate);
        const differenceInDays = (endDate - startDate) / (1000 * 3600 * 24);
        const amount =
            reservation.cars.reduce(
                (accumulator, currentValue) => currentValue.price + accumulator,
                0
            ) * differenceInDays;
        if (amount <= 0) {
            return null;
        }
        const paymentResult = await this.paymentProvider.execute(
            amount,
            paymentRequest
        );
        console.log(paymentResult);
        if (!paymentResult) {
            return null;
        }
        const newPayment = new Payment();
        newPayment.paymentDate = new Date();
        newPayment.paymentMethod = paymentRequest.paymentMethod;
        newPayment.reservation = reservation;
        newPayment.total = amount;
        const createdPayment = await this.paymentRepository.save(newPayment);
        await this.emailProvider.execute(newPayment, reservation.account);
        return {
            paymentId: createdPayment.id,
            total: amount,
            paymentMethod: paymentRequest.paymentMethod,
            paymentDate: newPayment.paymentDate,
            reservationId: newPayment.reservation.id
        };
    }
}
