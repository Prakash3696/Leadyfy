package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.Order;
import com.example.leadyfy_os.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE', 'CLIENT')")
    public List<Order> getOrdersByClient(@PathVariable Long clientId) {
        return orderRepository.findByClientId(clientId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE', 'CLIENT')")
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }
}
