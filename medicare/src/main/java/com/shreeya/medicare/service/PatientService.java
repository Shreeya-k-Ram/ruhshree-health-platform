package com.shreeya.medicare.service;

import java.util.*;
import com.shreeya.medicare.dto.PatientRequestDTO;
import com.shreeya.medicare.dto.PatientResponseDTO;
import com.shreeya.medicare.entity.Patient;
import com.shreeya.medicare.repository.PatientRepository;
import com.shreeya.medicare.repository.UserRepository;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class PatientService {

    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    // Save Patient
    public Patient savePatient(Patient patient) {

        logger.info("Saving patient: {}", patient.getName());
        Patient savedPatient = patientRepository.save(patient);
        logger.info("Patient saved successfully with ID: {}", savedPatient.getId());

        return savedPatient;
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public PatientResponseDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient == null || !patient.isActive()) {
            return null;
        }
        return convertToDTO(patient);
    }

    public PatientResponseDTO getPatientByUsername(String username) {

        Optional<Patient> patientOptional = patientRepository.findByUserUsername(username);

        if (patientOptional.isEmpty()) {
            return null;
        }
        Patient patient = patientOptional.get();

        if (!patient.isActive()) {
            return null;
        }
        return convertToDTO(patient);
    }

    public PatientResponseDTO updatePatient(Long id, PatientRequestDTO patientRequestDTO) {

        logger.info("Updating patient with ID: {}", id);
        Patient existingPatient = patientRepository.findById(id).orElse(null);

        if (existingPatient == null || !existingPatient.isActive()) {
            return null;
        }
        existingPatient.setName(patientRequestDTO.getName());
        existingPatient.setAge(patientRequestDTO.getAge());
        existingPatient.setGender(patientRequestDTO.getGender());
        existingPatient.setPhone(patientRequestDTO.getPhone());
        existingPatient.setEmail(patientRequestDTO.getEmail());
        existingPatient.setAddress(patientRequestDTO.getAddress());
        existingPatient.setDisease(patientRequestDTO.getDisease());

        Patient updatedPatient = patientRepository.save(existingPatient);

        logger.info("Patient updated successfully with ID: {}", updatedPatient.getName());

        return convertToDTO(updatedPatient);
    }

    // Delete Patient
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public PatientResponseDTO convertToDTO(Patient patient) {
        PatientResponseDTO dto = new PatientResponseDTO();

        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.setAge(patient.getAge());
        dto.setGender(patient.getGender());
        dto.setPhone(patient.getPhone());
        dto.setEmail(patient.getEmail());
        dto.setAddress(patient.getAddress());
        dto.setDisease(patient.getDisease());

        return dto;
    }

    public boolean deactivatePatient(Long id) {

        logger.info("Deactivating patient with ID: {}", id);
        Patient patient = patientRepository.findById(id).orElse(null);

        if (patient == null || !patient.isActive()) {
            return false;
        }
        patient.setActive(false);
        patientRepository.save(patient);

        logger.info("Patient deactivated successfully.");

        return true;
    }

    public List<PatientResponseDTO> searchPatientByName(String name) {
        List<Patient> patients = patientRepository.findByNameContainingIgnoreCase(name);
        List<PatientResponseDTO> response = new ArrayList<>();

        for (Patient patient : patients) {
            response.add(convertToDTO(patient));
        }
        return response;
    }

    public Page<PatientResponseDTO> getPatientsWithPagination(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Patient> patientPage = patientRepository.findAll(pageable);
        return patientPage.map(this::convertToDTO);
    }

    public List<PatientResponseDTO> getPatientsSorted(String field) {

        List<Patient> patients = patientRepository.findAll(Sort.by(field));
        List<PatientResponseDTO> response = new ArrayList<>();

        for (Patient patient : patients) {
            response.add(convertToDTO(patient));
        }
        return response;
    }

    public Page<PatientResponseDTO> getPatientsWithPaginationAndSorting(int page, int size, String field) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(field));
        Page<Patient> patientPage = patientRepository.findAll(pageable);

        return patientPage.map(this::convertToDTO);
    }
}