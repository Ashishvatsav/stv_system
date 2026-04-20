CREATE DATABASE stv_system;
USE stv_system;

CREATE TABLE Users (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(12),
    Role ENUM('ADMIN','TRAFFIC_OFFICER','CITIZEN','REVIEW_OFFICER'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Vehicles (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicleNumber VARCHAR(50),
    owner BIGINT,
    vehicleType ENUM('Car','Bike','Truck','Bus'),
    registrationDate DATE,
    FOREIGN KEY (owner) REFERENCES Users(Id)
);


CREATE TABLE Violation_types (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    violationName VARCHAR(100),
    Description TEXT,
    baseFineAmount DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Violation_tickets (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    Vehicle BIGINT,
    violationType BIGINT,
    issuedBy BIGINT,
    violationDate DATE,
    violationLocation VARCHAR(255),
    fineAmount DECIMAL(10,2),
    dueDate DATE,
    ticketStatus ENUM('ISSUED','PENDING_PAYMENT','PAID','OVERDUE','DISPUTED','CANCELLED'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Vehicle) REFERENCES Vehicles(Id),
    FOREIGN KEY (violationType) REFERENCES Violation_types(Id),
    FOREIGN KEY (issuedBy) REFERENCES Users(Id)
);


CREATE TABLE Payment_transactions (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    violationTicket BIGINT,
    Amount DECIMAL(10,2),
    paymentDate TIMESTAMP,
    paymentStatus ENUM('INITIATED','SUCCESS','FAILED'),
    referenceId VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (violationTicket) REFERENCES Violation_tickets(Id)
);


CREATE TABLE disputes (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    violationTicket BIGINT,
    raisedBy BIGINT,
    disputeReason TEXT,
    disputeStatus ENUM('OPEN','UNDER_REVIEW','APPROVED','REJECTED','CLOSED'),
    resolvedBy BIGINT,
    resolutionRemark TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolvedAt TIMESTAMP,
    FOREIGN KEY (violationTicket) REFERENCES Violation_tickets(Id),
    FOREIGN KEY (raisedBy) REFERENCES Users(Id),
    FOREIGN KEY (resolvedBy) REFERENCES Users(Id)
);