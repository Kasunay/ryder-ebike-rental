# Backend Development Guide - Spring Boot + PostgreSQL

## Overview
This guide will help you set up the Spring Boot backend for the Ryder bike rental platform.

## Prerequisites
- Java 17 or higher
- Maven or Gradle
- PostgreSQL 14+
- IntelliJ IDEA or Eclipse (recommended)

## 1. Project Setup

### Using Spring Initializr
Visit [start.spring.io](https://start.spring.io) and configure:

**Project Metadata:**
- Project: Maven
- Language: Java
- Spring Boot: 3.2.x (latest stable)
- Group: com.ryder
- Artifact: bike-rental
- Name: Ryder Bike Rental API
- Package name: com.ryder.bikerental
- Packaging: Jar
- Java: 17

**Dependencies to add:**
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Spring Security
- Lombok
- Validation
- Spring Boot DevTools

### Or Use This Maven Command
```bash
mvn archetype:generate \
  -DgroupId=com.ryder \
  -DartifactId=bike-rental \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

## 2. Database Setup

### Create PostgreSQL Database
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE ryder_rental;

-- Create user
CREATE USER ryder_admin WITH ENCRYPTED PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ryder_rental TO ryder_admin;
```

### Database Schema (Initial)

```sql
-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bikes table
CREATE TABLE bikes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    description TEXT,
    daily_price DECIMAL(10, 2) NOT NULL,
    monthly_price DECIMAL(10, 2) NOT NULL,
    battery_capacity INTEGER NOT NULL,
    max_speed INTEGER NOT NULL,
    range_km INTEGER NOT NULL,
    weight_kg DECIMAL(5, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    bike_id BIGINT NOT NULL REFERENCES bikes(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Special Offers table
CREATE TABLE special_offers (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    discount_percentage INTEGER,
    discount_type VARCHAR(20) NOT NULL,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_bike_id ON bookings(bike_id);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bikes_status ON bikes(status);
```

## 3. Application Configuration

### application.properties
```properties
# Server Configuration
server.port=8080
spring.application.name=ryder-bike-rental

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ryder_rental
spring.datasource.username=ryder_admin
spring.datasource.password=your_secure_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Logging
logging.level.org.springframework.web=INFO
logging.level.com.ryder=DEBUG

# CORS Configuration (for development)
cors.allowed-origins=http://localhost:5173
```

## 4. Project Structure

```
src/main/java/com/ryder/bikerental/
├── controller/          # REST Controllers
│   ├── BikeController.java
│   ├── BookingController.java
│   ├── UserController.java
│   └── OfferController.java
├── service/            # Business Logic
│   ├── BikeService.java
│   ├── BookingService.java
│   ├── UserService.java
│   └── OfferService.java
├── repository/         # Data Access Layer
│   ├── BikeRepository.java
│   ├── BookingRepository.java
│   ├── UserRepository.java
│   └── OfferRepository.java
├── model/             # Entity Models
│   ├── Bike.java
│   ├── Booking.java
│   ├── User.java
│   └── SpecialOffer.java
├── dto/               # Data Transfer Objects
│   ├── BikeDTO.java
│   ├── BookingDTO.java
│   └── UserDTO.java
├── config/            # Configuration Classes
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── WebConfig.java
└── exception/         # Custom Exceptions
    ├── ResourceNotFoundException.java
    └── GlobalExceptionHandler.java
```

## 5. Example Entity (Bike.java)

```java
package com.ryder.bikerental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bikes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bike {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String model;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "daily_price", nullable = false)
    private BigDecimal dailyPrice;
    
    @Column(name = "monthly_price", nullable = false)
    private BigDecimal monthlyPrice;
    
    @Column(name = "battery_capacity", nullable = false)
    private Integer batteryCapacity;
    
    @Column(name = "max_speed", nullable = false)
    private Integer maxSpeed;
    
    @Column(name = "range_km", nullable = false)
    private Integer rangeKm;
    
    @Column(name = "weight_kg", nullable = false)
    private BigDecimal weightKg;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BikeStatus status = BikeStatus.AVAILABLE;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

enum BikeStatus {
    AVAILABLE, RENTED, MAINTENANCE, UNAVAILABLE
}
```

## 6. Example REST Controller (BikeController.java)

```java
package com.ryder.bikerental.controller;

import com.ryder.bikerental.model.Bike;
import com.ryder.bikerental.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bikes")
@CrossOrigin(origins = "http://localhost:5173")
public class BikeController {
    
    @Autowired
    private BikeService bikeService;
    
    @GetMapping
    public ResponseEntity<List<Bike>> getAllBikes() {
        return ResponseEntity.ok(bikeService.getAllBikes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Bike> getBikeById(@PathVariable Long id) {
        return ResponseEntity.ok(bikeService.getBikeById(id));
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Bike>> getAvailableBikes() {
        return ResponseEntity.ok(bikeService.getAvailableBikes());
    }
    
    @PostMapping
    public ResponseEntity<Bike> createBike(@RequestBody Bike bike) {
        return ResponseEntity.ok(bikeService.createBike(bike));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Bike> updateBike(@PathVariable Long id, @RequestBody Bike bike) {
        return ResponseEntity.ok(bikeService.updateBike(id, bike));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBike(@PathVariable Long id) {
        bikeService.deleteBike(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 7. API Endpoints (Planned)

### Bikes
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/{id}` - Get bike by ID
- `GET /api/bikes/available` - Get available bikes
- `POST /api/bikes` - Create new bike (admin)
- `PUT /api/bikes/{id}` - Update bike (admin)
- `DELETE /api/bikes/{id}` - Delete bike (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `GET /api/bookings/user/{userId}` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Users
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Offers
- `GET /api/offers` - Get all active offers
- `GET /api/offers/{id}` - Get offer by ID
- `POST /api/offers` - Create offer (admin)

## 8. Running the Application

```bash
# Clean and build
mvn clean install

# Run the application
mvn spring-boot:run

# Or run the JAR
java -jar target/bike-rental-0.0.1-SNAPSHOT.jar
```

## 9. Testing with Postman/Curl

```bash
# Get all bikes
curl http://localhost:8080/api/bikes

# Create a bike (JSON)
curl -X POST http://localhost:8080/api/bikes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Urban Courier",
    "model": "UC-2024",
    "description": "Perfect for city deliveries",
    "dailyPrice": 15.00,
    "monthlyPrice": 350.00,
    "batteryCapacity": 500,
    "maxSpeed": 25,
    "rangeKm": 80,
    "weightKg": 22.0
  }'
```

## 10. Next Steps

1. Implement JWT authentication
2. Add input validation
3. Create custom exceptions
4. Add pagination for list endpoints
5. Implement booking availability logic
6. Add payment gateway integration
7. Set up automated tests (JUnit, MockMvc)
8. Add API documentation (Swagger/OpenAPI)
9. Implement logging and monitoring
10. Set up Docker for deployment

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Baeldung Spring Tutorials](https://www.baeldung.com/spring-boot)

Good luck with your backend development! 🚀
