package com.stv.stv_system.service;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.stv.stv_system.entity.Users;
import com.stv.stv_system.entity.Vehicles;
import com.stv.stv_system.entity.Violation_tickets;
import com.stv.stv_system.entity.Violation_types;
import com.stv.stv_system.enums.Role;
import com.stv.stv_system.enums.TicketStatus;
import com.stv.stv_system.repository.UsersRepository;
import com.stv.stv_system.repository.VehiclesRepository;
import com.stv.stv_system.repository.ViolationTicketsRepository;
import com.stv.stv_system.repository.ViolationTypesRepository;
@Service
public class ViolationTicketService {
    private final ViolationTicketsRepository ticketRepo;
    private final VehiclesRepository vehicleRepo;
    private final ViolationTypesRepository violationRepo;
    private final UsersRepository usersRepo;
    public ViolationTicketService(ViolationTicketsRepository ticketRepo,
                                  VehiclesRepository vehicleRepo,
                                  ViolationTypesRepository violationRepo,
                                  UsersRepository usersRepo) {
        this.ticketRepo = ticketRepo;
        this.vehicleRepo = vehicleRepo;
        this.violationRepo = violationRepo;
        this.usersRepo = usersRepo;
    }
    // ISSUE TICKET
    public Violation_tickets issueTicket(Long vehicleId, Long violationTypeId, Long officerId, String location) {
        Vehicles vehicle = vehicleRepo.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        Violation_types violationType = violationRepo.findById(violationTypeId)
                .orElseThrow(() -> new RuntimeException("Violation type not found"));
        Users officer = usersRepo.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found"));
        // RULE: Only TRAFFIC_OFFICER
        if (officer.getRole() != Role.TRAFFIC_OFFICER) {
            throw new RuntimeException("Only TRAFFIC_OFFICER can issue ticket");
        }
        Violation_tickets ticket = new Violation_tickets();
        ticket.setVehicle(vehicle);
        ticket.setViolationType(violationType);
        ticket.setIssuedBy(officer);
        ticket.setViolationDate(LocalDate.now());
        ticket.setViolationLocation(location);
        // Fine calculation
        ticket.setFineAmount(violationType.getBaseFineAmount());
        // Due date (example: +7 days)
        ticket.setDueDate(LocalDate.now().plusDays(7));
        // Status
        ticket.setTicketStatus(TicketStatus.PENDING_PAYMENT);
        return ticketRepo.save(ticket);
    }
    // GET ALL
    public List<Violation_tickets> getAllTickets() {
        return ticketRepo.findAll();
    }
    // GET BY ID
    public Violation_tickets getTicketById(Long id) {
        return ticketRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }
}
