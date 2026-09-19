package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.SupportTicket;
import com.example.leadyfy_os.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support-tickets")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE', 'CLIENT')")
public class SupportTicketController {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @GetMapping
    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    @PostMapping
    public SupportTicket createTicket(@RequestBody SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }
}
