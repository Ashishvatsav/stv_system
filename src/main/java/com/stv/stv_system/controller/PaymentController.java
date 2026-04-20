package com.stv.stv_system.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stv.stv_system.entity.Payment_transactions;
import com.stv.stv_system.service.PaymentService;
@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    // POST /api/payments
    @PostMapping
    public Payment_transactions makePayment(@RequestParam Long ticketId) {
        return paymentService.makePayment(ticketId);
    }
    // GET /api/payments
    @GetMapping
    public List<Payment_transactions> getAllPayments() {
        return paymentService.getAllPayments();
    }
}
