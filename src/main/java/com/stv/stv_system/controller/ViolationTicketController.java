package com.stv.stv_system.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stv.stv_system.entity.Violation_tickets;
import com.stv.stv_system.service.ViolationTicketService;
@RestController
@RequestMapping("/api/tickets")
public class ViolationTicketController {
    private final ViolationTicketService ticketService;
    public ViolationTicketController(ViolationTicketService ticketService) {
        this.ticketService = ticketService;
    }
    // POST /api/tickets
    @PostMapping
    public Violation_tickets issueTicket(@RequestParam Long vehicleId,
                                         @RequestParam Long violationTypeId,
                                         @RequestParam Long officerId,
                                         @RequestParam String location) {
        return ticketService.issueTicket(vehicleId, violationTypeId, officerId, location);
    }
    // GET /api/tickets
    @GetMapping
    public List<Violation_tickets> getAllTickets() {
        return ticketService.getAllTickets();
    }
    // GET /api/tickets/{id}
    @GetMapping("/{id}")
    public Violation_tickets getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }
}
