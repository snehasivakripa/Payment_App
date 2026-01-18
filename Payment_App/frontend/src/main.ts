import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';


import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { PaymentCardComponent } from './app/payment-card/payment-card.component';
import { Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule)]
}).then((appRef) => {
  
  const injector: Injector = appRef.injector;

  const paymentCardElement = createCustomElement(PaymentCardComponent, { injector });
  customElements.define('payment-card', paymentCardElement);
});