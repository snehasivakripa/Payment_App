# Payment_App
This repository includes:  

- **Backend**: Spring Boot service for tokenizing and simulating payments.  
- **Frontend**: Angular standalone component `<payment-card>` for collecting payment card information securely.  

The component is **designed to be reusable across any web application**, framework-agnostic, accessible, and fully customizable.

---

## Features

- Unified input fields for:
  - Card Number  
  - Expiry Date (MM/YY)  
  - CVC (Card Verification Code)  
  - Postal Code  
- Real-time client-side validation with visual feedback.  
- Secure tokenization: sensitive card info never sent to the backend.  
- Dummy payment API to simulate success/failure.  
- Framework-agnostic: usable in Angular, React, Vue, or plain HTML.  
- Customizable appearance via JSON `theme` object.  
- Fully accessible (ARIA, keyboard navigation, color contrast).  
- Programmatic error handling via events.

---

## Prerequisites

- **Backend**: Java 17+, Maven  
- **Frontend**: Node.js 18+, Angular CLI 16+  
- **Optional**: H2 Database (embedded, no setup required)

---

## Backend Setup

1. Navigate to the backend folder:

```bash
cd Payment_App/backend 
````
2. Build and run the Spring Boot app:
```bash
mvn clean install
mvn spring-boot:run
````
3. By default, the backend runs on:
```bash
http://localhost:8080
````
4. H2 Database Console:
```bash
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: (empty)
````
5. Endpoints:
POST /tokenize → returns a single-use token
POST /pay → accepts token and returns SUCCESS or FAILED
---

## Frontend Setup

1. Navigate to the frontend folder:
```bash
cd Payment_App/frontend
````
2. Install dependencies:
```bash
npm install
````
3. Start the Angular development server:
```bash
ng serve
````
4. Access the app:
```bash
http://localhost:4200
````
