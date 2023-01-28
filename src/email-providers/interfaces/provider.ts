import { Account } from '../../domain/models/account';
import { Payment } from '../../domain/models/payment';

export interface EmailProvider {
    execute(payment: Payment, account: Account): Promise<void>;
}
