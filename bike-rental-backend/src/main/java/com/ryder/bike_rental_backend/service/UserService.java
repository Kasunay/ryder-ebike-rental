package com.ryder.bike_rental_backend.service;

import com.ryder.bike_rental_backend.dto.LoginRequest;
import com.ryder.bike_rental_backend.dto.SignupRequest;
import com.ryder.bike_rental_backend.entity.User;
import com.ryder.bike_rental_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder encoder, JwtService jwtService){
        this.userRepository = userRepository;
        this.encoder=encoder;
        this.jwtService = jwtService;
    }

    public User signupUser(SignupRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        String encryptedPassword = encoder.encode(request.getPassword());

        User newUser = new User(request.getEmail(),encryptedPassword,request.getFirstName(),request.getLastName(),request.getPhone());

        return userRepository.save(newUser);
    }

    public String loginUser(LoginRequest loginRequest){
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(RuntimeException::new);
        if(!encoder.matches(loginRequest.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }
        return  jwtService.generateToken(user);
    }
}
