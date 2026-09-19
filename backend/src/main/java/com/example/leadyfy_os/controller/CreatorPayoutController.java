package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.CreatorPayout;
import com.example.leadyfy_os.repository.CreatorPayoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/creator-payouts")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
public class CreatorPayoutController {

    @Autowired
    private CreatorPayoutRepository creatorPayoutRepository;

    @GetMapping
    public List<CreatorPayout> getAllPayouts() {
        return creatorPayoutRepository.findAll();
    }

    @PostMapping
    public CreatorPayout createPayout(@RequestBody CreatorPayout payout) {
        return creatorPayoutRepository.save(payout);
    }
}
