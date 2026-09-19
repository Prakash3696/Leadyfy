package com.example.leadyfy_os.repository;

import com.example.leadyfy_os.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
