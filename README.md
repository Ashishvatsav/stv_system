🚦 Smart Traffic Violation Ticket Issuance & Payment System

<p align="center">
  <img src="https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/Language-Java-orange?style=for-the-badge&logo=java"/>
  <img src="https://img.shields.io/badge/API-RESTful-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/Ashishvatsav/stv_system?style=for-the-badge"/>
</p>
<p align="center">
  <img src="https://img.shields.io/github/stars/Ashishvatsav/stv_system?style=social"/>
  <img src="https://img.shields.io/github/forks/Ashishvatsav/stv_system?style=social"/>
  <img src="https://img.shields.io/github/issues/Ashishvatsav/stv_system?style=social"/>
</p>

⸻

🧠 Overview

A production-grade backend system that digitizes traffic violation workflows with:

* Role-based access control
* Automated fine calculation
* Payment tracking
* Dispute lifecycle management

⸻

🏗️ System Architecture

<p align="center">
  <img src="https://raw.githubusercontent.com/Ashishvatsav/stv_system/main/assets/system-design.svg" width="800"/>
</p>

🔹 Flow

Users → React Frontend → Spring Boot APIs → MySQL Database

⸻

🛠️ Tech Stack

Layer	Technology
Backend	Spring Boot (Java 17)
Database	MySQL
ORM	Hibernate / JPA
API	REST
Frontend	React.js (planned)

⸻

👥 Roles & Responsibilities

Role	Actions
ADMIN	Monitor system, analytics
TRAFFIC_OFFICER	Issue violation tickets
CITIZEN	Register vehicles, pay fines, raise disputes
REVIEW_OFFICER	Approve/reject disputes

⸻

🔄 Workflow Engine

🎫 Ticket Lifecycle

ISSUED → PENDING_PAYMENT → PAID → OVERDUE → DISPUTED → CANCELLED

💳 Payment Lifecycle

INITIATED → SUCCESS → FAILED

⚖️ Dispute Lifecycle

OPEN → UNDER_REVIEW → APPROVED → REJECTED → CLOSED

⸻

🚀 Features

* ✅ Automated fine calculation
* ✅ Role-based validation
* ✅ Lifecycle-driven state transitions
* ✅ Relational DB with FK constraints
* ✅ Clean REST API design

⸻

🗄️ Database Schema

Tables:

* Users
* Vehicles
* Violation_types
* Violation_tickets
* Payment_transactions
* disputes

⸻

🔌 API Endpoints

Module	Endpoint
Users	/api/users
Vehicles	/api/vehicles
Violations	/api/violations
Tickets	/api/tickets
Payments	/api/payments
Disputes	/api/disputes

⸻

⚡ Example Flow

1. Citizen registers vehicle
2. Officer issues ticket
3. System calculates fine
4. Citizen pays → ticket PAID
5. Citizen raises dispute
6. Review officer resolves

⸻

🧩 Setup

git clone https://github.com/Ashishvatsav/stv_system.git
cd stv_system
mvn spring-boot:run

⸻

📈 Future Scope

* JWT Authentication
* React dashboards
* Swagger documentation
* Analytics & reporting

⸻

👨‍💻 Author

Ashish Sreevatsav Nandigam
Full Stack Developer | Backend Engineer

⸻

🏁 Highlights

✔ Clean architecture
✔ Real-world workflow modeling
✔ Scalable backend design

⸻
