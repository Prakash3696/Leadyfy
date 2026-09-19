package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "order_id")
    private Long orderId;

    private BigDecimal amount;

    private String currency; // e.g. USD, INR

    private String method; // Bank Transfer, Credit Card, PayPal

    private String status; // Pending, Completed, Failed, Refunded

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
