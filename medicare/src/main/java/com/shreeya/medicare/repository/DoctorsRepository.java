package com.shreeya.medicare.repository;

import com.shreeya.medicare.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorsRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);

}