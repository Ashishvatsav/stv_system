package com.stv.stv_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.stv.stv_system.entity.Users;
public interface UsersRepository extends JpaRepository<Users, Long> {
}
