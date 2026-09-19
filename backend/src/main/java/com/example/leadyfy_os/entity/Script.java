package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Script {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(columnDefinition = "TEXT")
    private String scriptText;

    private String status; // Draft, Assigned, In Review, Sent to Client, Revision Required, Approved, Ready for Shoot

    @Column(name = "video_number")
    private Integer videoNumber;

    @Column(name = "writer_id")
    private Long writerId;

    @Column(name = "creator_id")
    private Long creatorId;

    private String language;

    private java.time.LocalDate deadline;

    @Column(name = "revision_count")
    private Integer revisionCount = 0;

    @Column(columnDefinition = "TEXT")
    private String comments;
}
