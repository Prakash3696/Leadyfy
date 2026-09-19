package com.example.leadyfy_os.repository;

import com.example.leadyfy_os.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
