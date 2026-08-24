package com.shreeya.medicare.controller;

import com.shreeya.medicare.dto.PatientRequestDTO;
import com.shreeya.medicare.dto.PatientResponseDTO;
import com.shreeya.medicare.entity.Patient;
import com.shreeya.medicare.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private PatientService patientService;

    // Add Patient
    @PostMapping
    public ResponseEntity<Patient> addPatient(@Valid @RequestBody Patient patient) {

        logger.info("Received request to add a new patient");

        Patient savedPatient = patientService.savePatient(patient);
        return ResponseEntity.status(201).body(savedPatient);
    }

    // Get All Patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/me")
    public ResponseEntity<PatientResponseDTO> getMyProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        PatientResponseDTO patient = patientService.getPatientByUsername(username);

        if (patient == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> getPatientById(@PathVariable Long id) {
        PatientResponseDTO patient = patientService.getPatientById(id);

        if (patient == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(patient);

    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> updatePatient(@PathVariable Long id, @Valid @RequestBody PatientRequestDTO patientRequestDTO) {

        logger.info("Received request to update a patient with id: {}", id);

        PatientResponseDTO updatedPatient = patientService.updatePatient(id, patientRequestDTO);

        if (updatedPatient == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deactivatePatient(@PathVariable Long id) {

        logger.info("Received request to deactivate patient with id: {}", id);

        boolean deleted = patientService.deactivatePatient(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of("message", "Patient Deactivated Successfully").toString());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PatientResponseDTO>> searchPatientByName(@RequestParam String name) {

        logger.info("Searching patient with name: {}", name);

        List<PatientResponseDTO> patients = patientService.searchPatientByName(name);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/page")
    public ResponseEntity<Page<PatientResponseDTO>> getPatientsWithPagination(@RequestParam int page, @RequestParam int size) {

        logger.info("Fetching patients with pagination. Page: {}, Size: {}", page, size);

        Page<PatientResponseDTO> patients = patientService.getPatientsWithPagination(page, size);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/sort")
    public ResponseEntity<List<PatientResponseDTO>> getPatientsSorted(@RequestParam String field) {

        logger.info("Fetching patients sorted by field: {}", field);

        List<PatientResponseDTO> patients = patientService.getPatientsSorted(field);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/page-sort")
    public ResponseEntity<Page<PatientResponseDTO>> getPatientsWithPaginationAndSorting(@RequestParam int page, @RequestParam int size,
                                                                                        @RequestParam String field) {

        logger.info("Fetching patients with pagination and sorting. Page: {}, Size: {}, Field: {}", page, size, field);

        Page<PatientResponseDTO> patients = patientService.getPatientsWithPaginationAndSorting(page, size, field);
        return ResponseEntity.ok(patients);
    }
}