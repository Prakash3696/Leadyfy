package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.Creator;
import com.example.leadyfy_os.repository.CreatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/creators")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
public class CreatorController {

    @Autowired
    private CreatorRepository creatorRepository;

    @GetMapping
    public List<Creator> getAllCreators() {
        return creatorRepository.findAll();
    }

    @PostMapping
    public Creator createCreator(@RequestBody Creator creator) {
        return creatorRepository.save(creator);
    }
}
