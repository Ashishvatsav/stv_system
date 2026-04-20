<h1 align="center">🚦 Smart Traffic Violation Ticket System</h1>
<p align="center">
  Role-Based Traffic Violation Management • Automated Fine Calculation • Workflow-Driven System
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/Language-Java-orange?style=for-the-badge&logo=java"/>
  <img src="https://img.shields.io/badge/API-REST-yellow?style=for-the-badge"/>
</p>
<p align="center">
  <img src="https://img.shields.io/github/stars/Ashishvatsav/stv_system?style=social"/>
  <img src="https://img.shields.io/github/forks/Ashishvatsav/stv_system?style=social"/>
  <img src="https://img.shields.io/github/issues/Ashishvatsav/stv_system?style=social"/>
</p>
<br/>



🧠 Overview

A production-grade backend system that digitizes traffic violation workflows with:

* Role-based access control
* Automated fine calculation
* Payment tracking system
* Dispute lifecycle management
* Structured workflow transitions

Users → React Frontend → Spring Boot APIs → MySQL Database



🛠️ Tech Stack

Layer	Technology
Backend	Spring Boot (Java 17)
Database	MySQL
ORM	Hibernate / JPA
API	RESTful APIs
Frontend	React.js (planned)

⸻

👥 Role-Based Access Control

Role	Responsibilities
ADMIN	Monitor users, vehicles, tickets, payments, disputes
TRAFFIC_OFFICER	Issue violation tickets
CITIZEN	Register vehicles, pay fines, raise disputes
REVIEW_OFFICER	Resolve disputes


🔄 Workflow Engine

🎫 Ticket Lifecycle

ISSUED → PENDING_PAYMENT → PAID → OVERDUE → DISPUTED → CANCELLED

💳 Payment Lifecycle

INITIATED → SUCCESS → FAILED

⚖️ Dispute Lifecycle

OPEN → UNDER_REVIEW → APPROVED → REJECTED → CLOSED



🚀 Key Features

* ✅ Automated fine calculation based on violation type
* ✅ Strict role-based validation
* ✅ Lifecycle-driven state management
* ✅ Relational database with foreign key constraints


🗄️ Database Schema

Tables:

* Users
* Vehicles
* Violation_types
* Violation_tickets
* Payment_transactions
* disputes



🔌 API Endpoints

Module	Endpoint
Users	/api/users
Vehicles	/api/vehicles
Violations	/api/violations
Tickets	/api/tickets
Payments	/api/payments
Disputes	/api/disputes



⚡ End-to-End Workflow

1. Citizen registers vehicle
2. Traffic officer issues violation ticket
3. System calculates fine automatically
4. Citizen pays fine → ticket marked PAID
5. Citizen raises dispute (if needed)
6. Review officer resolves dispute


🧩 Setup Instructions

git clone https://github.com/Ashishvatsav/stv_system.git
cd stv_system
mvn spring-boot:run

Configure Database

spring.datasource.url=jdbc:mysql://localhost:3306/stv_system
spring.datasource.username=root
spring.datasource.password=your_password



📈 Future Enhancements

* JWT Authentication & Authorization
* React Dashboard (All roles)
* Swagger API Documentation
* Notification System
* Analytics Dashboard



👨‍💻 Author

Ashish Sreevatsav Nandigam
Full Stack Developer | Backend Engineer



🏁 Highlights

✔ Clean Architecture
✔ Real-world Workflow Modeling
✔ Scalable Backend Design


