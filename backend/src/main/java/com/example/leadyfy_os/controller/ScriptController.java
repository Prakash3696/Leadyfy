package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.Script;
import com.example.leadyfy_os.repository.ScriptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/scripts")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
public class ScriptController {

    @Autowired
    private ScriptRepository scriptRepository;

    @GetMapping
    public List<Script> getAllScripts() {
        return scriptRepository.findAll();
    }

    @PostMapping
    public Script createScript(@RequestBody Script script) {
        return scriptRepository.save(script);
    }
}
