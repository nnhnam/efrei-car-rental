import { Account } from '../domain/models/account';
import { Payment } from '../domain/models/payment';
import { EmailProvider } from './interfaces/provider';
import { setTimeout } from 'timers/promises';

export class GmailProvider implements EmailProvider {
    async execute(payment: Payment, account: Account): Promise<void> {
        await setTimeout(1);
        console.log(`Sending confirmation email to ${account.email}`, payment);
    }
}
