package com.stv.stv_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.stv.stv_system.entity.Vehicles;
public interface VehiclesRepository extends JpaRepository<Vehicles, Long> {
}
