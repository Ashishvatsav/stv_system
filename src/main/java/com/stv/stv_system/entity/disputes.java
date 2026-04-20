package com.stv.stv_system.entity;
import java.time.LocalDateTime;

import com.stv.stv_system.enums.DisputeStatus;

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
@Table(name = "disputes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class disputes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long Id;
    @ManyToOne
    @JoinColumn(name = "violationTicket")
    private Violation_tickets violationTicket;
    @ManyToOne
    @JoinColumn(name = "raisedBy")
    private Users raisedBy;
    @Column(name = "disputeReason")
    private String disputeReason;
    @Enumerated(EnumType.STRING)
    @Column(name = "disputeStatus")
    private DisputeStatus disputeStatus;
    @ManyToOne
    @JoinColumn(name = "resolvedBy")
    private Users resolvedBy;
    @Column(name = "resolutionRemark")
    private String resolutionRemark;
    @Column(name = "createdAt")
    private LocalDateTime createdAt;
    @Column(name = "resolvedAt")
    private LocalDateTime resolvedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
