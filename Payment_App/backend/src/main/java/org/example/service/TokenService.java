package org.example.service;


import lombok.RequiredArgsConstructor;
import org.example.model.PaymentToken;
import org.example.repository.PaymentTokenRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final PaymentTokenRepository tokenRepo;

    public PaymentToken createToken(String last4) {
        String token = "tok_" + UUID.randomUUID();
        PaymentToken paymentToken = PaymentToken.builder()
                .token(token)
                .last4(last4)
                .build();
        return tokenRepo.save(paymentToken);
    }
}
