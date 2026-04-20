package com.stv.stv_system.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stv.stv_system.entity.Users;
import com.stv.stv_system.enums.Role;
import com.stv.stv_system.service.UserService;
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    // POST /api/users
    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return userService.createUser(user);
    }
    // GET /api/users
    @GetMapping
    public List<Users> getUsers(@RequestParam(required = false) Role role) {
        if (role != null) {
            return userService.getUsersByRole(role);
        }
        return userService.getAllUsers();
    }
}
