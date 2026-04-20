package com.stv.stv_system.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.stv.stv_system.entity.Users;
import com.stv.stv_system.entity.Vehicles;
import com.stv.stv_system.enums.Role;
import com.stv.stv_system.repository.UsersRepository;
import com.stv.stv_system.repository.VehiclesRepository;
@Service
public class VehicleService {
    private final VehiclesRepository vehiclesRepository;
    private final UsersRepository usersRepository;
    public VehicleService(VehiclesRepository vehiclesRepository,
                          UsersRepository usersRepository) {
        this.vehiclesRepository = vehiclesRepository;
        this.usersRepository = usersRepository;
    }
    // REGISTER VEHICLE
    public Vehicles registerVehicle(Long ownerId, Vehicles vehicle) {
        Users owner = usersRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Rule: Only CITIZEN can register vehicle
        if (owner.getRole() != Role.CITIZEN) {
            throw new RuntimeException("Only CITIZEN can register vehicle");
        }
        vehicle.setOwner(owner);
        return vehiclesRepository.save(vehicle);
    }
    // GET ALL VEHICLES
    public List<Vehicles> getAllVehicles() {
        return vehiclesRepository.findAll();
    }
}
