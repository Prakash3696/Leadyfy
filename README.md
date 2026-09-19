# Leadyfy OS — Agency Management System

> A full-stack agency operating system for managing clients, creators, scripts, shoots, videos, financials, and support — built with **Spring Boot** + **React (Vite)**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Getting Started](#getting-started)
- [Default Accounts](#default-accounts)
- [Role-Based Access Guide](#role-based-access-guide)
- [Key Features & Workflows](#key-features--workflows)
- [API Overview](#api-overview)

---

## Overview

Leadyfy OS is a complete agency management platform that handles the entire client-to-delivery lifecycle:

```
Lead Generation → Onboarding → Order Creation → Script Writing → Shoot Scheduling → 
Video Production → Client Review → Delivery → Invoicing & Payout
```

It supports four distinct user roles — **Owner, Admin, Employee, and Client** — each with a tailored dashboard and restricted access based on their responsibilities.

---

## Tech Stack

| Layer     | Technology                                   |
|-----------|----------------------------------------------|
| Backend   | Java 17, Spring Boot 3, Spring Security (JWT) |
| Database  | MySQL 8+                                     |
| Frontend  | React 18, Vite, TypeScript, Axios, Lucide Icons |
| Auth      | JWT stored in HttpOnly cookies               |

---

## Project Structure

```
Leadyfy/
├── backend/                  # Spring Boot application
│   └── src/main/java/com/example/leadyfy_os/
│       ├── config/           # Security, CORS configuration
│       ├── controller/       # REST API endpoints
│       ├── entity/           # JPA database entities
│       ├── repository/       # Spring Data JPA repositories
│       └── security/         # JWT filter, user details service
│
├── frontend/                 # React Vite application
│   └── src/
│       ├── dashboards/       # OwnerDashboard, EmployeeDashboard, ClientPortal
│       ├── context/          # AuthContext (JWT state management)
│       ├── components/       # ProtectedRoute
│       └── *.tsx             # Pages: Orders, Clients, Creators, Scripts, Shoots, Videos, Financials, Tasks, Support
│
└── doc/
    └── Leadyfy_OS_Requirements_Specification.pdf
```

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven** (bundled via `mvnw` wrapper, no separate install needed)
- **Node.js 18+** and **npm** — [Download](https://nodejs.org/)
- **MySQL 8+** — [Download](https://dev.mysql.com/downloads/mysql/)

---

## Configuration

### 1. Database Setup

The backend will **automatically create** the `leadyfy_db` database and all tables on first run (via Hibernate `ddl-auto=update`). You only need to ensure MySQL is running.

Update your database credentials in:

**`backend/src/main/resources/application.properties`**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/leadyfy_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL root password.

### 2. Frontend Proxy

The frontend is pre-configured to proxy API calls to `http://localhost:8080` via Vite's `vite.config.ts`. No changes needed unless your backend runs on a different port.

---

## Getting Started

### Step 1 — Start the Backend

Open a terminal inside the `backend/` directory:

```powershell
# Windows
.\mvnw.cmd spring-boot:run
```

```bash
# macOS / Linux
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**.

On first startup, it will:
- Create the `leadyfy_db` MySQL database
- Apply all schema migrations automatically
- Seed the database with default demo users (from `init.sql`)

### Step 2 — Start the Frontend

Open a **new terminal** inside the `frontend/` directory:

```bash
npm install    # Only needed the first time
npm run dev
```

The frontend will start on **http://localhost:5173** (or `5174` if that port is busy).

### Step 3 — Open the App

Navigate to **http://localhost:5173** in your browser and log in with one of the default accounts below.

---

## Default Accounts

All default accounts use the password: **`1234`**

> **Note:** These are for development only. Change credentials before any production deployment.

| Role     | Email                   | Password | Dashboard                  |
|----------|-------------------------|----------|----------------------------|
| Owner    | owner@leadyfy.com       | `1234`   | Full system access          |
| Admin    | admin@leadyfy.com       | `1234`   | All modules except financials settings |
| Employee | employee@leadyfy.com    | `1234`   | Tasks, Scripts, Shoots, Videos |
| Client   | client@leadyfy.com      | `1234`   | Client Portal (orders & videos) |

### Auto-Provisioned Client Accounts

When an Owner/Admin/Employee creates a new client through the **Order Management** form, the system **automatically creates a portal login** for that client.

- **Username:** The client's email address
- **Password:** `email@123` (e.g., if email is `john@acme.com`, password is `john@acme.com@123`)

The client can then log in to the **Client Portal** to view their orders and video deliveries.

---

## Role-Based Access Guide

### 👑 Owner

Full, unrestricted access to every module in the system.

**Navigation:** Dashboard → Orders → Clients → Creators → Tasks → Financials → Support → Scripts → Shoots → Videos

**Key Capabilities:**
- View the Owner Dashboard with revenue KPIs (total revenue, active orders, pending invoices)
- Generate new orders with automatic client account provisioning
- View and manage all financial ledgers (Payments, Expenses, Creator Payouts)
- Manage support tickets and assign them to employees
- Access all client, creator, script, shoot, and video records

---

### 🛡️ Admin

Same access as Owner, with full CRUD access across all modules.

**Key Capabilities:**
- Everything an Owner can do
- Typically responsible for day-to-day operations management

---

### 👤 Employee

Access to operational modules needed to fulfill orders. Financials are restricted.

**Navigation:** Dashboard → Tasks → Scripts → Shoots → Videos

**Key Capabilities:**
- View and update assigned **Tasks**
- Write and manage **Scripts** for client orders
- Schedule and manage **Shoots**
- Upload video links and track the **Video** production pipeline
- View **Clients** and **Creators** (read-only reference)

> **Restricted from:** Financials (Payments, Expenses, Payouts), full Client management

---

### 🏢 Client

Access only to their own **Client Portal** after logging in.

**Navigation:** Client Portal (single-page dashboard)

**Key Capabilities:**
- View their active and historical **Orders**
- See how many videos have been completed out of their contracted count
- **Purchase a new package** directly from the portal (generates a new Order)
- View outstanding balances on their account
- See delivered videos (links to final videos on Drive/etc.)

> **Restricted from:** All internal modules (Clients list, Financials, Tasks, etc.)

---

## Key Features & Workflows

### Generating a New Order (Owner/Admin/Employee)

1. Navigate to **Orders** (`/orders`)
2. Toggle **"New Client"** or **"Existing Client"**
3. **If New Client:** Fill in their details (name, company, email, phone, GST, etc.). Upon submission, the system automatically:
   - Creates their CRM Client profile
   - Provisions a portal login with password `email@123`
   - Generates the Order linked to their Client ID
4. **If Existing Client:** Select from the dropdown. Their info auto-fills. Edit any fields to update and submit.
5. Fill in **Package Details** (name, video count, price, GST) and click **"Generate Client & Order"**

### Client Self-Service Order (Client Portal)

1. Log in as a Client
2. Click **"Purchase a New Package"** at the top of the dashboard
3. Select a package tier and number of videos
4. Click **"Buy Now"** — generates a new Order in the system instantly

### The Production Pipeline Flow

```
NEW ORDER
  │
  ├─ SCRIPT: Written by employee → Client Approval → APPROVED
  │
  ├─ SHOOT: Scheduled with Creator + Staff → COMPLETED
  │
  ├─ VIDEO: Edited → CLIENT_REVIEW → Client Feedback → APPROVED
  │
  └─ FINANCIAL: Payment recorded → Creator Payout triggered
```

---

## API Overview

All API endpoints are secured with JWT authentication (via HttpOnly cookies).

| Method | Endpoint                     | Access                          | Description                          |
|--------|------------------------------|---------------------------------|--------------------------------------|
| POST   | `/api/auth/login`            | Public                          | Login and receive JWT cookie         |
| GET    | `/api/clients`               | OWNER, ADMIN, EMPLOYEE          | List all clients                     |
| POST   | `/api/clients`               | OWNER, ADMIN, EMPLOYEE          | Create/update client + auto-provision user |
| GET    | `/api/orders`                | OWNER, ADMIN, EMPLOYEE          | List all orders                      |
| POST   | `/api/orders`                | OWNER, ADMIN, EMPLOYEE, CLIENT  | Create new order                     |
| GET    | `/api/creators`              | OWNER, ADMIN, EMPLOYEE          | List all creators                    |
| GET    | `/api/scripts`               | OWNER, ADMIN, EMPLOYEE          | List all scripts                     |
| GET    | `/api/shoots`                | OWNER, ADMIN, EMPLOYEE          | List all shoots                      |
| GET    | `/api/videos`                | OWNER, ADMIN, EMPLOYEE          | List all videos                      |
| GET    | `/api/payments`              | OWNER, ADMIN                    | List all payments                    |
| GET    | `/api/expenses`              | OWNER, ADMIN                    | List all expenses                    |
| GET    | `/api/creator-payouts`       | OWNER, ADMIN                    | List all creator payouts             |
| GET    | `/api/tasks`                 | OWNER, ADMIN, EMPLOYEE          | List all tasks                       |
| GET    | `/api/support-tickets`       | OWNER, ADMIN, EMPLOYEE          | List all support tickets             |

---

## Security Notes

- JWT tokens are stored in `HttpOnly` cookies to prevent XSS attacks
- All passwords are hashed using **BCrypt** before storage
- Role-based access control (RBAC) is enforced via Spring Security `@PreAuthorize` at the method level
- Default test credentials should be **changed immediately** in any staging or production environment

---

*Built with ❤️ using Spring Boot & React*
