package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Shoot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;
    
    @Column(name = "creator_id")
    private Long creatorId;

    private String location;
    private String dateTime;
    private String status; // Scheduled, Confirmed, In Progress, Completed, Cancelled, Reshoot Required

    private String cameraman;

    @Column(name = "shoot_manager")
    private String shootManager;

    @Column(name = "shooting_assistant")
    private String shootingAssistant;

    @Column(name = "special_notes", columnDefinition = "TEXT")
    private String specialNotes;
}
