# TrafficFlow - Smart Traffic Violation Ticket Issuance & Payment System

A professional SaaS frontend for managing traffic violations, penalties, and fine payments with role-based access control.

## 🎯 Project Overview

TrafficFlow is a comprehensive traffic management system designed to digitally manage traffic violations, penalties, and fine payments. The system supports four distinct user roles with tailored interfaces and functionalities.

## 👥 User Roles

### 1. **CITIZEN**
- Register and manage vehicles
- View issued violation tickets
- Track ticket status and payment history
- Pay fines online via multiple payment methods
- Raise disputes against tickets
- Appeal process with evidence submission

### 2. **TRAFFIC_OFFICER**
- Issue violation tickets
- Select violation types and calculate fines
- Enter violation location and details
- View all violations they have issued
- Track payment status of issued violations

### 3. **REVIEW_OFFICER**
- Review citizen disputes
- Approve or reject dispute appeals
- Provide resolution remarks
- Generate dispute reports
- Track dispute resolution metrics

### 4. **ADMIN**
- User management (create, view, filter by role)
- System oversight and analytics
- Payment and violation statistics
- Generate comprehensive reports
- System health monitoring

## 📁 Project Structure

```
app/
├── page.tsx                          # Home page (redirects to login)
├── login/
│   └── page.tsx                     # Login page
├── signup/
│   └── page.tsx                     # Signup with role selection
└── dashboard/
    ├── layout.tsx                   # Dashboard layout with sidebar
    ├── page.tsx                     # Role-based dashboard home
    ├── violations/
    │   └── page.tsx                # Citizen: View violations
    ├── vehicles/
    │   └── page.tsx                # Citizen: Manage vehicles
    ├── payments/
    │   └── page.tsx                # Citizen: Payment history
    ├── disputes/
    │   └── page.tsx                # Citizen: Raise disputes
    ├── issue-ticket/
    │   └── page.tsx                # Officer: Issue tickets (placeholder)
    ├── violations-list/
    │   └── page.tsx                # Officer/Admin: View all violations (placeholder)
    ├── users/
    │   └── page.tsx                # Admin: User management (placeholder)
    └── reports/
        └── page.tsx                # Admin: Analytics (placeholder)

components/
└── ui/                              # Shadcn UI components (pre-configured)

lib/
└── utils.ts                         # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: Professional Blue (`oklch(0.42 0.15 255)`)
- **Secondary**: Lighter Blue (`oklch(0.56 0.14 255)`)
- **Success**: Green (`oklch(0.65 0.18 145)`)
- **Warning**: Orange (`oklch(0.72 0.21 65)`)
- **Destructive**: Red (`oklch(0.577 0.245 27.325)`)
- **Neutral**: Grays and whites for backgrounds and text

### Typography
- **Font Family**: Geist (default system font)
- **Heading Scale**: Semantic HTML (h1-h6)
- **Line Height**: 1.5 for optimal readability

### Spacing & Layout
- **Grid System**: 4px base unit (Tailwind spacing)
- **Responsive**: Mobile-first design with md: breakpoint (768px)
- **Components**: Flexbox for 1D layouts, CSS Grid for 2D layouts

## 🔑 Key Features Implemented

### Authentication
- ✅ Professional login page with remember-me option
- ✅ Role-based signup with step-by-step process
- ✅ Demo credentials for testing
- ✅ Password visibility toggle
- ✅ Form validation with error/success messages

### Citizen Dashboard
- 📊 Quick metrics (Active violations, Paid violations, Total fines, Vehicles)
- 📋 Recent violations with status tracking
- 🚗 Vehicle management (register, view, edit, delete)
- 💳 Payment history with multiple payment methods
- 🛡️ Dispute management and appeal process
- 📈 Clear status indicators (Pending, Paid, Overdue, Disputed)

### Traffic Officer Dashboard
- 📊 Key metrics (Tickets issued, Total fines, Pending payments)
- 🎫 Quick access to issue new tickets
- 📋 Violation history and management

### Review Officer Dashboard
- 🔍 Open disputes awaiting review
- 📊 Dispute resolution metrics
- ✅ Approval/rejection interface

### Admin Dashboard
- 📊 System-wide statistics and analytics
- 👥 User management overview
- 💰 Revenue tracking
- 📈 System health monitoring

## 🎯 UI/UX Best Practices Implemented

### Navigation & Structure
- ✅ Clear information hierarchy
- ✅ Consistent sidebar navigation
- ✅ Breadcrumb-style current page indicators
- ✅ Mobile-responsive hamburger menu

### Forms & Input
- ✅ Clear labels and placeholders
- ✅ Real-time validation feedback
- ✅ Password visibility toggles
- ✅ Helpful error messages and validation

### Data Presentation
- ✅ Sortable/filterable tables
- ✅ Status badges with color coding
- ✅ Summary cards for key metrics
- ✅ Action buttons with clear intent

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels where necessary
- ✅ Keyboard navigation support
- ✅ Sufficient color contrast
- ✅ Alternative text for icons

### Visual Feedback
- ✅ Loading states with spinners
- ✅ Success/error toast messages
- ✅ Hover effects for interactive elements
- ✅ Disabled state for buttons
- ✅ Status color coding (green, orange, red)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run development server:**
   ```bash
   pnpm dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

### Default Routes
- `/` - Redirects to login
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Main dashboard (role-based content)
- `/dashboard/violations` - View violations (Citizen)
- `/dashboard/vehicles` - Manage vehicles (Citizen)
- `/dashboard/payments` - Payment history (Citizen)
- `/dashboard/disputes` - Raise disputes (Citizen)

### Demo Credentials
Use any of these to test the login:

| Role | Email | Password |
|------|-------|----------|
| Citizen | citizen@demo.com | password123 |
| Officer | officer@demo.com | password123 |
| Review Officer | reviewer@demo.com | password123 |
| Admin | admin@demo.com | password123 |

## 📊 API Integration Points

The frontend is structured to connect with the following API endpoints:

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/logout`

### Users
- `POST /api/users`
- `GET /api/users`
- `GET /api/users?role=CITIZEN`

### Vehicles
- `POST /api/vehicles`
- `GET /api/vehicles`
- `GET /api/vehicles/{id}`
- `PUT /api/vehicles/{id}`
- `DELETE /api/vehicles/{id}`

### Violations
- `GET /api/violations`
- `GET /api/violations/{id}`
- `POST /api/violations`

### Payments
- `POST /api/payments`
- `GET /api/payments`
- `GET /api/payments/{id}`

### Disputes
- `POST /api/disputes`
- `GET /api/disputes`
- `GET /api/disputes/{id}`
- `PUT /api/disputes/{id}/resolve`

## 🔄 Workflow Lifecycles

### Ticket Lifecycle
```
ISSUED → PENDING_PAYMENT → PAID → OVERDUE → DISPUTED → CANCELLED
```

### Payment Lifecycle
```
INITIATED → SUCCESS → FAILED
```

### Dispute Lifecycle
```
OPEN → UNDER_REVIEW → APPROVED → REJECTED → CLOSED
```

## 🎯 Status Indicators

### Violation Status
- 🟡 **Pending** - Awaiting payment
- 🟠 **Overdue** - Due date passed
- ✅ **Paid** - Payment completed
- 🟣 **Disputed** - Under appeal review
- ⭕ **Cancelled** - Case closed

### Payment Status
- 🟡 **Pending** - Not yet paid
- ✅ **Completed** - Successfully paid
- ❌ **Failed** - Payment failed

### Dispute Status
- 🟡 **Open** - Awaiting review
- 🔵 **Under Review** - Being investigated
- ✅ **Approved** - Dispute accepted
- ❌ **Rejected** - Dispute denied
- ⭕ **Closed** - Case resolved

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript
- **Build Tool**: Turbopack
- **Package Manager**: pnpm

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced for tablets (768px+)
- **Desktop**: Full-featured experience (1024px+)
- **Sidebar**: Collapses to hamburger menu on mobile

## ✨ Future Enhancements

- [ ] Real backend API integration
- [ ] Authentication state management (NextAuth/Auth.js)
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Real-time notifications
- [ ] Document upload for disputes
- [ ] SMS/Email notifications
- [ ] Advanced analytics dashboard
- [ ] Audit logs
- [ ] Role-based permissions system
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PDF export for reports

## 📝 License

This project is part of the Smart Traffic System initiative.

## 🤝 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for safer roads**
