package com.stv.stv_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.stv.stv_system.entity.Payment_transactions;
public interface PaymentTransactionsRepository extends JpaRepository<Payment_transactions, Long> {
}
