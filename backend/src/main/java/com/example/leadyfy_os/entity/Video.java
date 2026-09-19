package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;
    
    @Column(name = "shoot_id")
    private Long shootId;

    private String videoLink;
    private String status; // Script Approved, Shoot Pending, Raw Footage Received, Video Editing, Internal QA, Client Review, Revision, Final Approved, Delivered

    @Column(name = "package_order_id")
    private Long packageOrderId;

    @Column(name = "script_id")
    private Long scriptId;

    @Column(name = "creator_id")
    private Long creatorId;

    @Column(name = "assigned_editor_id")
    private Long assignedEditorId;

    private java.time.LocalDate deadline;

    @Column(name = "thumbnail_link")
    private String thumbnailLink;

    @Column(name = "client_feedback_log", columnDefinition = "TEXT")
    private String clientFeedbackLog;

    @Column(name = "revision_count")
    private Integer revisionCount = 0;

    @Column(name = "final_delivery_link")
    private String finalDeliveryLink;
}
