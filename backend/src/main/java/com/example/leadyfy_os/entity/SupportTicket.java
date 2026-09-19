package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class SupportTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String status; // Open, In Progress, Resolved, Closed

    private String priority; // Low, Medium, High, Urgent

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "assigned_to_id")
    private Long assignedToId;
}
