package com.AI_Project.Resume_analyser;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "You are authenticated!";
    }

    @GetMapping("/api/guest")
    public String guest(){
        return "Guest Mode is activated!";
    }
}