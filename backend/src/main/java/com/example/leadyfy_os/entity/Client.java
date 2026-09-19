package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(name = "company_name")
    private String companyName;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;
    
    private String status; // Lead, New, Onboarding, Active, On Hold, Completed, Inactive

    @Column(name = "user_id")
    private Long userId; // Link to User account
    
    private String whatsapp;
    private String industry;
    
    @Column(name = "gst_tax_id")
    private String gstTaxId;
    
    @Column(name = "assigned_employee_id")
    private Long assignedEmployeeId;
    
    private String source;
    
    @Column(name = "assets_brand_kits")
    private String assetsBrandKits;
}
