package com.stv.stv_system.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.stv.stv_system.entity.Violation_types;
import com.stv.stv_system.repository.ViolationTypesRepository;
@Service
public class ViolationTypeService {
    private final ViolationTypesRepository violationTypesRepository;
    public ViolationTypeService(ViolationTypesRepository violationTypesRepository) {
        this.violationTypesRepository = violationTypesRepository;
    }
    // CREATE VIOLATION TYPE
    public Violation_types createViolationType(Violation_types violationType) {
        return violationTypesRepository.save(violationType);
    }
    // GET ALL VIOLATION TYPES
    public List<Violation_types> getAllViolationTypes() {
        return violationTypesRepository.findAll();
    }
}
