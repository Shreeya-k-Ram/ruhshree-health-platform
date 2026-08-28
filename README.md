# 🏥 RuhShree Health

### Healthcare Appointment Platform

RuhShree Health is a full-stack healthcare web application that provides a secure platform for patients and doctors to manage healthcare appointment workflows.

The application is built with a React.js frontend, Spring Boot REST API backend, and MySQL database. It uses JWT authentication and Spring Security for secure, role-based access to protected resources.

---

🌐 **Live Demo:**
graceful-emotion-production-6a61.up.railway.app

---

## 🎯 Project Overview

RuhShree Health is designed around two primary user roles:

- 👤 Patient
- 👨‍⚕️ Doctor

The platform allows patients to discover doctors and book appointments, while doctors can access their dashboard and manage appointments.

The project focuses on implementing real-world backend concepts such as authentication, authorization, REST APIs, database relationships, JWT security, and role-based access control.

---

## ✨ Key Features

### 👤 Patient

- Patient registration and login
- JWT-based authentication
- Patient dashboard
- View available doctors
- View doctor information
- Book appointments
- View appointment details
- Access protected patient resources

### 👨‍⚕️ Doctor

- Doctor login
- JWT-based authentication
- Doctor dashboard
- View professional profile
- View doctor address and contact information
- View scheduled appointments
- Approve appointments
- Cancel appointments
- View relevant patient information

### 👑 Admin

- Secure admin authentication
- Access protected admin dashboard
- View appointment requests
- Approve appointment requests
- Manage appointment-related operations
- Protected admin endpoints

### 📅 Appointment Management

- Patient-to-doctor appointment booking
- Appointment date and time management
- Appointment status tracking
- Doctor-specific appointment retrieval
- Doctor appointment approval
- Admin appointment request approval
- Appointment cancellation and doctor and patient information

### 🔐 Security

- JWT authentication
- Spring Security
- Role-based authorization
- Protected REST API endpoints
- Custom JWT request filter
- Secure token-based API communication
- Access-denied handling for unauthorized dashboard access
- CORS configuration

---

## 🔄 Application Workflow

### 👤 Patient Workflow

Home Page
↓
Register / Login
↓
JWT Authentication
↓
Patient Dashboard
↓
Explore Doctors
↓
Select Doctor
↓
Book Appointment
↓
Appointment Confirmation
↓
View Appointment

### 👨‍⚕️ Doctor Workflow

Login
↓
JWT Authentication
↓
Doctor Dashboard
↓
View Profile
↓
View Appointments
↓
Approve / Cancel Appointment

### 👑 Admin Workflow

Login
↓
JWT Authentication
↓
Admin Dashboard
↓
View Appointment Requests
↓
Review Appointment
↓
Approve Appointment
↓
Appointment Status Updated

### 🔐 Authorization Workflow

Login
↓
JWT Token Generated
↓
Role Identified
↓
Protected API Request
↓
JwtFilter Validates Token
↓
Spring Security Checks Role
↓
Authorized Resource / Access Denied

---

## 🛠️ Technology Stack

### 🎨 Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### ⚙️ Backend

- Java
- Spring Boot
- Spring Security
- REST APIs
- JWT
- Spring Data JPA
- Hibernate
- OpenAPI / Swagger

### 🗄️ Database

- MySQL

### 🔧 Development Tools

- Maven
- Git
- GitHub
- IntelliJ IDEA
- VS Code

### ☁️ Deployment

- Railway

---

## 🏗️ Application Architecture

RuhShree Health follows a layered Controller-Service-Repository architecture.

```
┌──────────────────────────┐
│      React Frontend      │
│        (Vite)            │
└────────────┬─────────────┘
             │
             │ REST API + JWT
             ▼
┌──────────────────────────┐
│     Spring Boot API      │
├──────────────────────────┤
│       Controllers        │
├──────────────────────────┤
│         Services         │
├──────────────────────────┤
│       Repositories       │
├──────────────────────────┤
│     Spring Security      │
├──────────────────────────┤
│       JWT Filter         │
└────────────┬─────────────┘
             │
             │ JPA / Hibernate
             ▼
┌──────────────────────────┐
│          MySQL           │
└──────────────────────────┘
```
---

## 📁 Project Structure
```
medicare/
│
├── ruhshree-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/shreeya/medicare/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── dto/
│       │       ├── entity/
│       │       ├── exception/
│       │       ├── repository/
│       │       ├── security/
│       │       └── service/
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
└── README.md
```
---

## 🔐 Authentication & Authorization

RuhShree Health uses JWT-based authentication with Spring Security.

### 🔑 Authentication Flow

User Login
     ↓
Credentials Verified
     ↓
JWT Token Generated
     ↓
Token Stored by Frontend
     ↓
Token Sent With API Requests
     ↓
JwtFilter Intercepts Request
     ↓
JWT Token Validated
     ↓
User Role Extracted
     ↓
Spring Security Authorizes Request
     ↓
Protected Resource Access

---

## 🛡️ Security Components
- SecurityConfig
- JwtFilter
- JwtService
- Spring Security
- JWT authentication
- Protected REST endpoints

---

## 🔄 API Overview

| Module | Endpoint | Method | Purpose |
|--------|----------|--------|---------|
| User | `/users/register` | POST | Register a user |
| User | `/users/login` | POST | Authenticate user |
| Patient | `/patients/...` | GET / POST / PUT | Patient operations |
| Doctor | `/doctors/...` | GET / POST / PUT | Doctor operations |
| Appointment | `/appointments/...` | GET / POST / PUT | Appointment operations |

API documentation is configured using **OpenAPI / Swagger**.

---

## 🚀 Getting Started

### 📋 Prerequisites

- Java 17+
- Maven
- Node.js & npm
- MySQL
- Git

### 1️. Clone the Repository
```
git clone
https://github.com/Shreeya-k-Ram/ruhshree-health-platform.git

cd ruhshree-health-platform
```

### 2️. Configure MySQL

Create a MySQL database:
```
CREATE DATABASE medicare_db;
```

Update:
```
src/main/resources/application.properties
```

Use local credentials:
```
spring.datasource.url=jdbc:mysql://localhost:3306/medicare_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3️. Run the Spring Boot Backend

Windows
```
mvnw.cmd spring-boot:run
```
Linux / macOS 
```
./mvnw spring-boot:run
```
Backend: 
```
http://localhost:8080
```

### 4️. Run the React Frontend

Open a new terminal:
```
cd ruhshree-frontend
npm install
npm run dev
```
Frontend: 
```
http://localhost:5173
```

### 5️. Open the Application

```
http://localhost:5173
```
---

## 🌐 Deployment

The application is deployed using Railway.

Live Demo:
```
graceful-emotion-production-6a61.up.railway.app
```

The deployed application uses the production backend and database configuration.

---

## 🔮 Future Enhancements

Possible future improvements include:

📧 Email and SMS appointment notifications
💳 Online payment integration
📄 Digital prescription management
📹 Online doctor consultation
📊 Advanced admin analytics
🔍 Advanced search, filtering and pagination
⭐ Patient review and rating system
🔔 Real-time appointment notifications
📈 Production monitoring and logging

---

## 📚 What I Learned

Through this project, I gained practical experience in:

- Building REST APIs with Spring Boot
- Implementing JWT authentication
- Configuring Spring Security
- Implementing role-based authorization
- Connecting React.js with Spring Boot APIs
- Working with MySQL and JPA
- Designing Controller-Service-Repository architecture
- Using DTOs for API communication
- Managing entity relationships with JPA/Hibernate
- Handling secured API requests and CORS
- Deploying a full-stack application using Railway
- Using Git and GitHub for version control

---

## 👩‍💻 Author

Shreeya Ram

Java | Full-Stack Developer

- GitHub:
```
https://github.com/Shreeya-k-Ram
```

- LinkedIn:
```
https://www.linkedin.com/in/shreeya-kumari-ram-bba022334
```
---
---

