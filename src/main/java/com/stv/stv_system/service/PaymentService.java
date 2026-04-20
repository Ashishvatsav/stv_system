package com.stv.stv_system.service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.stv.stv_system.entity.Payment_transactions;
import com.stv.stv_system.entity.Violation_tickets;
import com.stv.stv_system.enums.PaymentStatus;
import com.stv.stv_system.enums.TicketStatus;
import com.stv.stv_system.repository.PaymentTransactionsRepository;
import com.stv.stv_system.repository.ViolationTicketsRepository;
@Service
public class PaymentService {
    private final PaymentTransactionsRepository paymentRepo;
    private final ViolationTicketsRepository ticketRepo;
    public PaymentService(PaymentTransactionsRepository paymentRepo,
                          ViolationTicketsRepository ticketRepo) {
        this.paymentRepo = paymentRepo;
        this.ticketRepo = ticketRepo;
    }
    // PAY FINE
    public Payment_transactions makePayment(Long ticketId) {
        Violation_tickets ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        // RULE: Cannot pay disputed or cancelled
        if (ticket.getTicketStatus() == TicketStatus.DISPUTED ||
            ticket.getTicketStatus() == TicketStatus.CANCELLED) {
            throw new RuntimeException("Payment not allowed for this ticket");
        }
        Payment_transactions payment = new Payment_transactions();
        payment.setViolationTicket(ticket);
        payment.setAmount(ticket.getFineAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setReferenceId(UUID.randomUUID().toString());
        // Simulate success
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        // Update ticket status
        ticket.setTicketStatus(TicketStatus.PAID);
        ticketRepo.save(ticket);
        return paymentRepo.save(payment);
    }
    // GET ALL PAYMENTS
    public List<Payment_transactions> getAllPayments() {
        return paymentRepo.findAll();
    }
}
