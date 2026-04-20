package com.stv.stv_system.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.stv.stv_system.entity.Users;
import com.stv.stv_system.enums.Role;
import com.stv.stv_system.repository.UsersRepository;
@Service
public class UserService {
    private final UsersRepository usersRepository;
    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    // CREATE USER
    public Users createUser(Users user) {
        return usersRepository.save(user);
    }
    // GET ALL USERS
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
    // FILTER BY ROLE
    public List<Users> getUsersByRole(Role role) {
        return usersRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == role)
                .toList();
    }
}
