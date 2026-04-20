package com.stv.stv_system.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stv.stv_system.entity.Vehicles;
import com.stv.stv_system.service.VehicleService;
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private final VehicleService vehicleService;
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }
    // POST /api/vehicles
    @PostMapping
    public Vehicles registerVehicle(@RequestParam Long ownerId,
                                    @RequestBody Vehicles vehicle) {
        return vehicleService.registerVehicle(ownerId, vehicle);
    }
    // GET /api/vehicles
    @GetMapping
    public List<Vehicles> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }
}
