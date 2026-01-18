import { Component, Output,EventEmitter,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService, TokenizeRequest } from '../payment.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  @Input() theme: any = {}; 
  @Output() paymentToken = new EventEmitter<string>();
  @Output() validationError = new EventEmitter<any>();

  cardNumber = '';
  expiry = '';
  cvc = '';
  postalCode = '';
  errors: any = {};
  isValid = false;
  transactionMessage: string = '';
  transactionStatus: string = '';

   constructor(private paymentService: PaymentService) {}
  /** Card input validation */
  onCardInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.replace(/\s/g, '');
    this.cardNumber = value;
    this.errors.cardNumber = this.luhnCheck(value) ? '' : 'Invalid card number';
    this.validate();
  }

  /** Expiry input validation MM/YY */
  onExpiryInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.expiry = value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    this.errors.expiry = regex.test(value) ? '' : 'Invalid expiry';
    this.validate();
  }

  /** CVC validation */
  onCvcInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.cvc = value;
    this.errors.cvc = /^\d{3,4}$/.test(value) ? '' : 'Invalid CVC';
    this.validate();
  }

  /** Postal code validation */
  onPostalInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.postalCode = value;
    this.errors.postalCode = /^\d{4,6}$/.test(value) ? '' : 'Invalid postal code';
    this.validate();
  }

  /** Validate form and emit errors */
  validate() {
    this.isValid =
      Object.values(this.errors).every((e) => !e) &&
      !!this.cardNumber &&
      !!this.expiry &&
      !!this.cvc &&
      !!this.postalCode;

    if (!this.isValid) {
      this.validationError.emit(this.errors);
    }
  }

  /** Tokenize card */
  tokenize() {
    if (!this.isValid) {
      this.validationError.emit(this.errors);
      return;
    }

    const payload: TokenizeRequest = {
      cardNumber: this.cardNumber,
      expiryMonth: this.expiry.split('/')[0],
      expiryYear: '20' + this.expiry.split('/')[1],
      cvc: this.cvc,
      postalCode: this.postalCode,
    };

    this.paymentService.tokenize(payload).pipe(
      catchError(err => {
        this.transactionMessage = 'Tokenization failed';
        this.transactionStatus = 'failed';
        return throwError(() => err);
      })
    ).subscribe(res => {
      const token = res.token;
      this.paymentToken.emit(token);

      // Now call pay
      this.paymentService.pay({ token, amount: 100 }).pipe(
        catchError(err => {
          this.transactionMessage = 'Payment failed';
          this.transactionStatus = 'failed';
          return throwError(() => err);
        })
      ).subscribe(payRes => {
      if (payRes.status === 'SUCCESS') {
    this.transactionMessage = 'Payment has been successfully done';
    this.transactionStatus = 'success';
  } else {
    this.transactionMessage = 'Payment could not be processed. Check your card details or try another payment method.';
    this.transactionStatus = 'failed';
  }
      });
    });
  }

  /** Luhn algorithm check */
  luhnCheck(num: string): boolean {
    let sum = 0,
      alt = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let n = parseInt(num[i], 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  }
}
