package com.stv.stv_system.entity;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.stv.stv_system.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "Payment_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment_transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long Id;
    @ManyToOne
    @JoinColumn(name = "violationTicket")
    private Violation_tickets violationTicket;
    @Column(name = "Amount")
    private BigDecimal Amount;
    @Column(name = "paymentDate")
    private LocalDateTime paymentDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "paymentStatus")
    private PaymentStatus paymentStatus;
    @Column(name = "referenceId")
    private String referenceId;
    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
