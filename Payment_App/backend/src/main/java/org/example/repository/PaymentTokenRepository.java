package org.example.repository;

import org.example.model.PaymentToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentTokenRepository extends JpaRepository<PaymentToken, UUID> {
    Optional<PaymentToken> findByToken(String token);
    boolean existsByToken(String token);
}