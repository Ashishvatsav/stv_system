package com.stv.stv_system.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stv.stv_system.entity.Violation_types;
import com.stv.stv_system.service.ViolationTypeService;
@RestController
@RequestMapping("/api/violations")
public class ViolationTypeController {
    private final ViolationTypeService violationTypeService;
    public ViolationTypeController(ViolationTypeService violationTypeService) {
        this.violationTypeService = violationTypeService;
    }
    // POST /api/violations
    @PostMapping
    public Violation_types createViolation(@RequestBody Violation_types violation) {
        return violationTypeService.createViolationType(violation);
    }
    // GET /api/violations
    @GetMapping
    public List<Violation_types> getAllViolations() {
        return violationTypeService.getAllViolationTypes();
    }
}
