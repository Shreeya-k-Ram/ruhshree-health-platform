package com.shreeya.medicare.service;

import com.shreeya.medicare.entity.Doctor;
import com.shreeya.medicare.entity.User;
import com.shreeya.medicare.repository.DoctorsRepository;
import com.shreeya.medicare.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorsRepository doctorRepository;

    public DoctorService(DoctorsRepository doctorRepository,
                         UserRepository userRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor getDoctorByUsername(String username) {

        return doctorRepository
                .findByUserUsername(username)
                .orElse(null);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doc = doctorRepository.findById(id).orElse(null);

        if (doc != null) {
            doc.setName(updatedDoctor.getName());
            doc.setSpecialization(updatedDoctor.getSpecialization());
            doc.setPhone(updatedDoctor.getPhone());
            doc.setEmail(updatedDoctor.getEmail());
            doc.setExperience(updatedDoctor.getExperience());

            return doctorRepository.save(doc);
        }

        return null;
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}