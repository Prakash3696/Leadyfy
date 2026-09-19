package com.example.leadyfy_os.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category; // Software, Marketing, Rent, Office Supplies, Travel, Other

    private BigDecimal amount;

    private String currency; // e.g. USD, INR

    @Column(name = "expense_date")
    private LocalDate expenseDate;

    @Column(name = "incurred_by_id")
    private Long incurredById;

    private String vendor;

    private String receiptLink;

    private String status; // Pending Approval, Approved, Reimbursed, Rejected

    @Column(columnDefinition = "TEXT")
    private String description;
}
