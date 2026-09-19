package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class CreatorPayout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "creator_id")
    private Long creatorId;

    @Column(name = "shoot_id")
    private Long shootId;

    @Column(name = "video_id")
    private Long videoId; // If payment is per video

    private BigDecimal amount;

    private String currency; // e.g. USD, INR

    private String status; // Pending, Paid, On Hold

    @Column(name = "payout_date")
    private LocalDateTime payoutDate;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
