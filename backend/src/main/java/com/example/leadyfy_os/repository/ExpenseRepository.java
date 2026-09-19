package com.example.leadyfy_os.repository;

import com.example.leadyfy_os.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
