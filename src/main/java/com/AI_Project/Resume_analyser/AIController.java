package com.AI_Project.Resume_analyser;

import com.AI_Project.Resume_analyser.Service.AIService;
import com.AI_Project.Resume_analyser.dto.AIAnalysisRequest;
import com.AI_Project.Resume_analyser.dto.AIAnalysisResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/test")
    public String testAI() {
        return aiService.testAI();
    }

    @PostMapping("/analyze")
    public AIAnalysisResponse analyzeResume(
            @RequestBody AIAnalysisRequest request) {

        return aiService.analyzeResume(
                request.getResumeText(),
                request.getJobDescription()
        );
    }
}