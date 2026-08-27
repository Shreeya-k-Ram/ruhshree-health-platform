package com.shreeya.medicare.service;

import com.shreeya.medicare.entity.User;
import com.shreeya.medicare.entity.Patient;
import com.shreeya.medicare.entity.Doctor;
import com.shreeya.medicare.repository.DoctorsRepository;
import com.shreeya.medicare.repository.PatientRepository;
import com.shreeya.medicare.repository.UserRepository;
import com.shreeya.medicare.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.shreeya.medicare.dto.LoginRequestDTO;
import com.shreeya.medicare.dto.LoginResponseDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder ;

    @Autowired
    private DoctorsRepository doctorsRepository;

    @Transactional
    public User registerUser(User user) {

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save User first
        User savedUser = userRepository.save(user);

        if ("PATIENT".equalsIgnoreCase(savedUser.getRole())) {

            Patient patient = new Patient();

            if (user.getPatient() != null) {

                patient.setName(user.getPatient().getName());
                patient.setAge(user.getPatient().getAge());
                patient.setGender(user.getPatient().getGender());
                patient.setPhone(user.getPatient().getPhone());
                patient.setEmail(savedUser.getEmail());
                patient.setAddress(user.getPatient().getAddress());
                patient.setDisease(user.getPatient().getDisease());
            }

            patient.setUser(savedUser);
            savedUser.setPatient(patient);
            patientRepository.save(patient);
        }

        else if ("DOCTOR".equalsIgnoreCase(savedUser.getRole())) {

            if (user.getDoctor() == null) {
                throw new RuntimeException("Doctor details are required");
            }

            Doctor doctor = new Doctor();

            doctor.setName(user.getDoctor().getName());
            doctor.setSpecialization(user.getDoctor().getSpecialization());
            doctor.setPhone(user.getDoctor().getPhone());
            doctor.setEmail(savedUser.getEmail());
            doctor.setExperience(user.getDoctor().getExperience());
            doctor.setAddress(user.getDoctor().getAddress());

            // New doctors must be verified by admin
            doctor.setStatus("PENDING");
            doctor.setUser(savedUser);
            savedUser.setDoctor(doctor);
            doctorsRepository.save(doctor);
        }

        return savedUser;
    }

    public boolean forgotPassword(String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false;
        }

        return true;
    }

    public boolean resetPassword(String email, String newPassword) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return true;
    }

    @Autowired
    private JwtService jwtService;

    public LoginResponseDTO loginUser(LoginRequestDTO request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole());

        return new LoginResponseDTO(token, user.getRole());
    }
}
