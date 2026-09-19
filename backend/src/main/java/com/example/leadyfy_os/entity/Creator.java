package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Creator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String gender;
    private String ageGroup;
    private String niches;
    private String status; // Available, Booked, Unavailable, On Hold

    private String photo;

    private String languages;

    private String location;

    private String demographics;

    private String contact;

    @Column(columnDefinition = "TEXT")
    private String rates;

    @Column(name = "bank_info", columnDefinition = "TEXT")
    private String bankInfo;

    @Column(name = "portfolio_links", columnDefinition = "TEXT")
    private String portfolioLinks;
}
