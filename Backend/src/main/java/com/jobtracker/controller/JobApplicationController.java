package com.jobtracker.controller;

import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository repository;

    @GetMapping
    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    @PostMapping
    public JobApplication createApplication(@RequestBody JobApplication application) {
        return repository.save(application);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getApplicationById(@PathVariable Long id) {
        JobApplication application = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not exist with id :" + id));
        return ResponseEntity.ok(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateApplication(@PathVariable Long id, @RequestBody JobApplication applicationDetails) {
        JobApplication application = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not exist with id :" + id));

        application.setCompanyName(applicationDetails.getCompanyName());
        application.setRoleTitle(applicationDetails.getRoleTitle());
        application.setStatus(applicationDetails.getStatus());
        application.setAppliedDate(applicationDetails.getAppliedDate());
        application.setDeadline(applicationDetails.getDeadline());
        application.setNotes(applicationDetails.getNotes());
        application.setJobLink(applicationDetails.getJobLink());

        JobApplication updatedApplication = repository.save(application);
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        JobApplication application = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not exist with id :" + id));

        repository.delete(application);
        return ResponseEntity.noContent().build();
    }
}
