package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "assigned_to_id")
    private Long assignedToId;

    @Column(name = "created_by_id")
    private Long createdById;

    private String status; // Pending, In Progress, Blocked, Completed

    private String priority; // Low, Medium, High, Urgent

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "related_order_id")
    private Long relatedOrderId;
}
