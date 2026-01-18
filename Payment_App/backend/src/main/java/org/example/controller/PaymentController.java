package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.model.Payment;
import org.example.model.PaymentToken;
import org.example.service.PaymentService;
import org.example.service.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class PaymentController {

    private final TokenService tokenService;
    private final PaymentService paymentService;

    // ---------------- TOKENIZE ----------------
    @PostMapping("/tokenize")
    public ResponseEntity<?> tokenize(@RequestBody Map<String, String> cardData) {
        String cardNumber = cardData.get("cardNumber");
        if (cardNumber == null || cardNumber.length() < 4) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid card number"));
        }

        String last4 = cardNumber.substring(cardNumber.length() - 4);
        PaymentToken token = tokenService.createToken(last4);

        return ResponseEntity.ok(Map.of("token", token.getToken()));
    }

    // ---------------- PAY ----------------
    @PostMapping("/pay")
    public ResponseEntity<Map<String, String>> pay(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        if (token == null || token.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token required"));
        }

        try {
            Payment payment = paymentService.pay(token);
            return ResponseEntity.ok(Map.of("status", payment.getStatus(), "token", payment.getToken()));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
