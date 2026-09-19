package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.Shoot;
import com.example.leadyfy_os.repository.ShootRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/shoots")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
public class ShootController {

    @Autowired
    private ShootRepository shootRepository;

    @GetMapping
    public List<Shoot> getAllShoots() {
        return shootRepository.findAll();
    }

    @PostMapping
    public Shoot createShoot(@RequestBody Shoot shoot) {
        return shootRepository.save(shoot);
    }
}
