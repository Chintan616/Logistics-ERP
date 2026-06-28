# LogiFlow - Smart Warehouse & Shipment Management Platform

LogiFlow is a comprehensive, enterprise-grade internal logistics and warehouse management system. It provides end-to-end tracking of inventory, from supplier purchases and product categorization to order processing and shipment dispatch.

## 🚀 Features

* **Dashboard Analytics:** Real-time metrics tracking Revenue, Pending Orders, Total Products, and Completed Shipments.
* **Warehouse Inventory:** Manage Categories, Products, and stock levels. Tracks both total stock and reserved stock (allocated for pending orders).
* **Supplier & Purchase Management:** Track suppliers and restock inventory via purchase records.
* **Order Processing Workflow:** Create customer orders, which automatically reserve stock and enter a `PENDING` state.
* **Shipment Management:** Assign couriers to pending orders. Updating a shipment to `SHIPPED` permanently deducts the reserved inventory.
* **Security:** Secured REST API using JWT Authentication and Spring Security.
* **Modern UI:** Built with React, featuring a premium glassmorphism aesthetic, pill-badge statuses, and responsive data grids.

## 🛠️ Technology Stack

* **Backend:** Java, Spring Boot 3, Spring Security (JWT), Spring Data JPA, Hibernate.
* **Database:** PostgreSQL (Hosted on Neon).
* **Frontend:** React.js, Axios, React Router, Custom CSS (Inter font, Flexbox/Grid).

## ⚙️ Running Locally

### Prerequisites
* Java 21+
* Node.js and npm
* A PostgreSQL Database (Update `application.properties` with your credentials)

### 1. Start the Backend (Spring Boot)
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
./mvnw clean spring-boot:run
```
The backend will run on `http://localhost:5050`.

### 2. Start the Frontend (React)
Open a new terminal window and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm start
```
The frontend will open automatically at `http://localhost:3000`.

## 🔐 Getting Started (Admin Registration)
By default, there are no seeded users in the database. 
To create your first Admin user, run this `curl` command against your running backend:

```bash
curl -X POST http://localhost:5050/api/auth/register \
-H "Content-Type: application/json" \
-d '{
    "name": "Super Admin",
    "email": "admin@logiflow.com",
    "password": "password",
    "phoneNumber": "1234567890",
    "role": "ADMIN"
}'
```

You can then log into the frontend at `http://localhost:3000/login` with:
* **Email:** `admin@logiflow.com`
* **Password:** `password`

---
*Built as a professional logistics transformation of an Inventory Management System.*
