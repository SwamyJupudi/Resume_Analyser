package com.AI_Project.Resume_analyser;

import com.AI_Project.Resume_analyser.Service.AuthService;
import com.AI_Project.Resume_analyser.dto.LoginRequest;
import com.AI_Project.Resume_analyser.dto.RegisterRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return authService.login(request);
    }
}