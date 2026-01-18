import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentCardComponent } from './payment-card/payment-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaymentCardComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'payment_app';
  // app.component.ts
handleToken(token: string) {
  console.log('Payment token:', token);
  // send token to backend API for dummy payment
}

handleError(errors: any) {
  console.log('Validation errors:', errors);
}

}
