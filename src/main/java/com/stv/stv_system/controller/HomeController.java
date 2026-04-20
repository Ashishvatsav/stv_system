package com.stv.stv_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("/")
	public String home() {
		return "Welcome to STV System!";
	}

	@GetMapping("/api/health")
	public String health() {
		return "Application is running";
	}

}
