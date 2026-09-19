package com.example.leadyfy_os.controller;

import com.example.leadyfy_os.entity.Video;
import com.example.leadyfy_os.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/videos")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
public class VideoController {

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @PostMapping
    public Video createVideo(@RequestBody Video video) {
        return videoRepository.save(video);
    }
}
