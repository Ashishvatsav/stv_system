package com.stv.stv_system.entity;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.stv.stv_system.enums.TicketStatus;

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
@Table(name = "Violation_tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Violation_tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long Id;
    @ManyToOne
    @JoinColumn(name = "Vehicle")
    private Vehicles Vehicle;
    @ManyToOne
    @JoinColumn(name = "violationType")
    private Violation_types violationType;
    @ManyToOne
    @JoinColumn(name = "issuedBy")
    private Users issuedBy;
    @Column(name = "violationDate")
    private LocalDate violationDate;
    @Column(name = "violationLocation")
    private String violationLocation;
    @Column(name = "fineAmount")
    private BigDecimal fineAmount;
    @Column(name = "dueDate")
    private LocalDate dueDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "ticketStatus")
    private TicketStatus ticketStatus;
    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
