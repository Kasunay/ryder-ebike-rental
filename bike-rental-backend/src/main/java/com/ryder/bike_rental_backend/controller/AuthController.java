package com.ryder.bike_rental_backend.controller;

import com.ryder.bike_rental_backend.dto.LoginRequest;
import com.ryder.bike_rental_backend.dto.SignupRequest;
import com.ryder.bike_rental_backend.entity.User;
import com.ryder.bike_rental_backend.service.JwtService;
import com.ryder.bike_rental_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup (@Valid @RequestBody SignupRequest signupRequest){
            User user = userService.signupUser(signupRequest);
            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully",
                    "userId", user.getId()
            ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
        String credentials = userService.loginUser(loginRequest);
        return ResponseEntity.ok(Map.of(
                "message","User logged in successfully",
                "token", credentials
        ));
    }

}
