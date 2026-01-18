package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.model.Payment;
import org.example.model.PaymentToken;
import org.example.repository.PaymentRepository;
import org.example.repository.PaymentTokenRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {


    private final PaymentTokenRepository tokenRepo;
    private final PaymentRepository paymentRepo;

    public Payment pay(String token) {
        PaymentToken paymentToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        if (paymentToken.isUsed()) {
            throw new IllegalStateException("Token already used");
        }

       boolean success=Math.random()>0.3;

        Payment payment = Payment.builder()
                .token(token)
                .status(success ? "SUCCESS" : "FAILED")
                .build();

        return paymentRepo.save(payment);
    }
}
