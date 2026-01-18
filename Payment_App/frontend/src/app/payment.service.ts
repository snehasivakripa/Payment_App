import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface TokenizeRequest {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  postalCode: string;
}

export interface TokenizeResponse {
  token: string;
  last4?: string;
}

export interface PayRequest {
  token: string;
  amount: number;
}

export interface PayResponse {
  status: string; // SUCCESS / FAILED
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}


  tokenize(payload: TokenizeRequest): Observable<TokenizeResponse> {
    return this.http.post<TokenizeResponse>('http://localhost:8080/api/tokenize', payload);
  }


  pay(payload: PayRequest): Observable<PayResponse> {
    return this.http.post<PayResponse>('http://localhost:8080/api/pay', payload);
  }
}