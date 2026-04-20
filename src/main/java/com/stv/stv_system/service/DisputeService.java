package com.stv.stv_system.service;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.stv.stv_system.entity.Users;
import com.stv.stv_system.entity.Violation_tickets;
import com.stv.stv_system.entity.disputes;
import com.stv.stv_system.enums.DisputeStatus;
import com.stv.stv_system.enums.Role;
import com.stv.stv_system.enums.TicketStatus;
import com.stv.stv_system.repository.DisputesRepository;
import com.stv.stv_system.repository.UsersRepository;
import com.stv.stv_system.repository.ViolationTicketsRepository;
@Service
public class DisputeService {
    private final DisputesRepository disputeRepo;
    private final ViolationTicketsRepository ticketRepo;
    private final UsersRepository usersRepo;
    public DisputeService(DisputesRepository disputeRepo,
                          ViolationTicketsRepository ticketRepo,
                          UsersRepository usersRepo) {
        this.disputeRepo = disputeRepo;
        this.ticketRepo = ticketRepo;
        this.usersRepo = usersRepo;
    }
    // RAISE DISPUTE
    public disputes raiseDispute(Long ticketId, Long userId, String reason) {
        Violation_tickets ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        Users user = usersRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // RULE: Only CITIZEN
        if (user.getRole() != Role.CITIZEN) {
            throw new RuntimeException("Only CITIZEN can raise dispute");
        }
        disputes dispute = new disputes();
        dispute.setViolationTicket(ticket);
        dispute.setRaisedBy(user);
        dispute.setDisputeReason(reason);
        dispute.setDisputeStatus(DisputeStatus.OPEN);
        // Update ticket status
        ticket.setTicketStatus(TicketStatus.DISPUTED);
        ticketRepo.save(ticket);
        return disputeRepo.save(dispute);
    }
    // RESOLVE DISPUTE
    public disputes resolveDispute(Long disputeId, Long officerId, String decision, String remark) {
        disputes dispute = disputeRepo.findById(disputeId)
                .orElseThrow(() -> new RuntimeException("Dispute not found"));
        Users officer = usersRepo.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found"));
        // RULE: Only REVIEW_OFFICER
        if (officer.getRole() != Role.REVIEW_OFFICER) {
            throw new RuntimeException("Only REVIEW_OFFICER can resolve disputes");
        }
        Violation_tickets ticket = dispute.getViolationTicket();
        dispute.setResolvedBy(officer);
        dispute.setResolutionRemark(remark);
        dispute.setResolvedAt(LocalDateTime.now());
        if (decision.equalsIgnoreCase("APPROVED")) {
            dispute.setDisputeStatus(DisputeStatus.APPROVED);
            ticket.setTicketStatus(TicketStatus.CANCELLED);
        } else {
            dispute.setDisputeStatus(DisputeStatus.REJECTED);
        }
        ticketRepo.save(ticket);
        return disputeRepo.save(dispute);
    }
}
