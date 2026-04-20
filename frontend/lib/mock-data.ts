// Mock Users
export const mockUsers = [
  {
    id: "1",
    email: "citizen@demo.com",
    password: "password123",
    name: "John Smith",
    role: "citizen",
    licenseNo: "DL123456789",
    phone: "+1-555-123-4567",
  },
  {
    id: "2",
    email: "officer@demo.com",
    password: "password123",
    name: "Officer Sarah Johnson",
    role: "traffic_officer",
    badgeNo: "TO-2024-001",
    department: "Traffic Enforcement",
    phone: "+1-555-987-6543",
  },
  {
    id: "3",
    email: "reviewer@demo.com",
    password: "password123",
    name: "John Review Officer",
    role: "review_officer",
    empId: "RO-2024-001",
    department: "Dispute Resolution",
    phone: "+1-555-456-7890",
  },
  {
    id: "4",
    email: "admin@demo.com",
    password: "password123",
    name: "Admin Panel",
    role: "admin",
    empId: "AD-2024-001",
    department: "System Administration",
    phone: "+1-555-321-9876",
  },
];

// Mock Vehicles
export const mockVehicles = [
  {
    id: "v1",
    citizenId: "1",
    licensePlate: "DL01AB1234",
    vehicleType: "Car",
    manufacturer: "Honda",
    model: "Civic",
    color: "Silver",
    year: 2020,
    registrationNo: "DL01AB1234",
    registrationExpiry: "2025-12-31",
  },
  {
    id: "v2",
    citizenId: "1",
    licensePlate: "DL02XY5678",
    vehicleType: "Motorcycle",
    manufacturer: "Hero",
    model: "Splendor",
    color: "Black",
    year: 2019,
    registrationNo: "DL02XY5678",
    registrationExpiry: "2024-06-30",
  },
];

// Mock Violations
export const mockViolations = [
  {
    id: "vio1",
    citizenId: "1",
    vehicleId: "v1",
    violationType: "Speeding",
    fine: 500,
    status: "pending",
    location: "Ring Road, Sector 5",
    dateTime: "2024-04-15T14:30:00",
    officerId: "2",
    description: "Speed limit exceeded by 25 km/h in 40 km/h zone",
    photoUrl: "https://via.placeholder.com/400x300?text=Violation+Photo",
  },
  {
    id: "vio2",
    citizenId: "1",
    vehicleId: "v1",
    violationType: "No Parking",
    fine: 300,
    status: "paid",
    location: "Connaught Place",
    dateTime: "2024-03-20T09:15:00",
    officerId: "2",
    description: "Vehicle parked in no-parking zone",
    paidDate: "2024-03-25",
    paymentMethod: "credit_card",
    photoUrl: "https://via.placeholder.com/400x300?text=Violation+Photo",
  },
  {
    id: "vio3",
    citizenId: "1",
    vehicleId: "v2",
    violationType: "Red Light Violation",
    fine: 1000,
    status: "overdue",
    location: "Traffic Signal, ITO",
    dateTime: "2024-02-10T16:45:00",
    officerId: "2",
    description: "Crossed red light at intersection",
    photoUrl: "https://via.placeholder.com/400x300?text=Violation+Photo",
  },
  {
    id: "vio4",
    citizenId: "1",
    vehicleId: "v1",
    violationType: "Helmet Not Worn",
    fine: 200,
    status: "disputed",
    location: "Main Street",
    dateTime: "2024-04-10T11:20:00",
    officerId: "2",
    description: "Rider not wearing safety helmet",
    disputeId: "d1",
    photoUrl: "https://via.placeholder.com/400x300?text=Violation+Photo",
  },
];

// Mock Disputes
export const mockDisputes = [
  {
    id: "d1",
    violationId: "vio4",
    citizenId: "1",
    status: "open",
    reason: "Weather conditions made helmet visibility unclear in photo",
    description: "I was wearing a helmet, the photo angle is misleading",
    filedDate: "2024-04-11T10:00:00",
    reviewerId: "3",
    remarks: null,
    decision: null,
  },
  {
    id: "d2",
    violationId: "vio1",
    citizenId: "1",
    status: "rejected",
    reason: "Speeding violation clear from evidence",
    description: "Speed was within limits, officer made error",
    filedDate: "2024-04-16T08:30:00",
    reviewerId: "3",
    remarks: "Clear evidence from speed detection equipment. Rejection upheld.",
    decision: "rejected",
  },
];

// Mock Payments
export const mockPayments = [
  {
    id: "p1",
    violationId: "vio2",
    citizenId: "1",
    amount: 300,
    method: "credit_card",
    status: "success",
    transactionId: "TXN20240325001",
    date: "2024-03-25T14:20:00",
    reference: "Payment for Violation #vio2",
  },
  {
    id: "p2",
    violationId: "vio1",
    citizenId: "1",
    amount: 500,
    method: "upi",
    status: "pending",
    transactionId: "UPI20240415001",
    date: "2024-04-15T16:00:00",
    reference: "Payment for Violation #vio1",
  },
];

// Mock Issued Tickets (for Traffic Officer)
export const mockIssuedTickets = [
  {
    id: "t1",
    officerId: "2",
    violationId: "vio1",
    issuedDate: "2024-04-15T14:30:00",
    location: "Ring Road, Sector 5",
    status: "issued",
  },
  {
    id: "t2",
    officerId: "2",
    violationId: "vio2",
    issuedDate: "2024-03-20T09:15:00",
    location: "Connaught Place",
    status: "paid",
  },
];

// Mock System Users (for Admin)
export const mockSystemUsers = [
  ...mockUsers,
  {
    id: "5",
    email: "officer2@demo.com",
    password: "password123",
    name: "Officer Mike Brown",
    role: "traffic_officer",
    badgeNo: "TO-2024-002",
    department: "Traffic Enforcement",
    phone: "+1-555-111-2222",
  },
  {
    id: "6",
    email: "reviewer2@demo.com",
    password: "password123",
    name: "Reviewer Lisa Anderson",
    role: "review_officer",
    empId: "RO-2024-002",
    department: "Dispute Resolution",
    phone: "+1-555-333-4444",
  },
];

// Violation Types & Fines
export const violationTypes = [
  { type: "Speeding", fine: 500, description: "Exceeding speed limit" },
  { type: "Red Light Violation", fine: 1000, description: "Crossing red light" },
  { type: "No Parking", fine: 300, description: "Parking in no-parking zone" },
  { type: "Helmet Not Worn", fine: 200, description: "Not wearing safety helmet" },
  { type: "Seat Belt Not Worn", fine: 150, description: "Not wearing seat belt" },
  { type: "Rash Driving", fine: 800, description: "Reckless driving behavior" },
];
