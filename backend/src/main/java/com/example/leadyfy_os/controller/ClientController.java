package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.Client;
import com.example.leadyfy_os.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/clients")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private com.example.leadyfy_os.repository.UserRepository userRepository;
    
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        // 1. Upsert Client logic based on email
        Client existingClient = clientRepository.findByEmail(client.getEmail()).orElse(null);
        if (existingClient != null) {
            // Update existing client fields
            existingClient.setClientName(client.getClientName());
            existingClient.setCompanyName(client.getCompanyName());
            existingClient.setPhone(client.getPhone());
            existingClient.setWhatsapp(client.getWhatsapp());
            existingClient.setIndustry(client.getIndustry());
            existingClient.setGstTaxId(client.getGstTaxId());
            existingClient.setAssetsBrandKits(client.getAssetsBrandKits());
            existingClient.setAssignedEmployeeId(client.getAssignedEmployeeId());
            existingClient.setStatus(client.getStatus());
            client = existingClient;
        }

        // 2. Check User provisioning
        com.example.leadyfy_os.entity.User existingUser = userRepository.findByEmail(client.getEmail()).orElse(null);
        if (existingUser == null) {
            com.example.leadyfy_os.entity.User newUser = new com.example.leadyfy_os.entity.User();
            newUser.setEmail(client.getEmail());
            newUser.setPassword(passwordEncoder.encode(client.getEmail() + "@123")); // Default password
            newUser.setRole("ROLE_CLIENT");
            newUser = userRepository.save(newUser);
            client.setUserId(newUser.getId());
        } else {
            client.setUserId(existingUser.getId());
        }

        return clientRepository.save(client);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        return clientRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
