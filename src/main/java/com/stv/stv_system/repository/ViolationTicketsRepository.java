package com.stv.stv_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.stv.stv_system.entity.Violation_tickets;
public interface ViolationTicketsRepository extends JpaRepository<Violation_tickets, Long> {
}
