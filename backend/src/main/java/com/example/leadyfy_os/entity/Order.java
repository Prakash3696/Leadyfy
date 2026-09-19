package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = false)
    private Long clientId;

    @Column(name = "package_name", nullable = false)
    private String packageName;

    private String status;

    private BigDecimal price;

    @Column(name = "contracted_video_count")
    private Integer contractedVideoCount;
    
    @Column(name = "completed_video_count")
    private Integer completedVideoCount = 0;

    @Column(name = "gst_tax")
    private BigDecimal gstTax;

    @Column(name = "total_invoice_amount")
    private BigDecimal totalInvoiceAmount;

    @Column(name = "amount_received")
    private BigDecimal amountReceived;

    @Column(name = "outstanding_balance")
    private BigDecimal outstandingBalance;

    @Column(name = "start_date")
    private java.time.LocalDate startDate;

    @Column(name = "due_date")
    private java.time.LocalDate dueDate;

    @Column(name = "assigned_team")
    private String assignedTeam;
}
