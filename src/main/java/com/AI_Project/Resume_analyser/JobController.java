package com.AI_Project.Resume_analyser;

import com.AI_Project.Resume_analyser.Service.JobDescriptionService;
import com.AI_Project.Resume_analyser.Service.ResumeAnalyzerService;
import com.AI_Project.Resume_analyser.Service.ResumeService;
import com.AI_Project.Resume_analyser.dto.AIAnalysisResponse;
import com.AI_Project.Resume_analyser.dto.JobDescriptionRequest;
import com.AI_Project.Resume_analyser.dto.ResumeAnalysisResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.AI_Project.Resume_analyser.Service.AIService;
import java.util.List;
import java.time.LocalDateTime;
import com.AI_Project.Resume_analyser.Model.User;
import com.AI_Project.Resume_analyser.Model.ResumeAnalysis;
import com.AI_Project.Resume_analyser.Repository.UserRepository;
import com.AI_Project.Resume_analyser.Repository.ResumeAnalysisRepository;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.Authentication;
@RestController
@RequestMapping("/api/job")
public class JobController {

    private final JobDescriptionService jobDescriptionService;
    private final ResumeAnalyzerService resumeAnalyzerService;
    private final ResumeService resumeService;
    private final AIService aiService;
    private final UserRepository userRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    public JobController(
            JobDescriptionService jobDescriptionService,
            ResumeAnalyzerService resumeAnalyzerService,
            ResumeService resumeService ,
            AIService aiService ,
            UserRepository userRepository,
            ResumeAnalysisRepository resumeAnalysisRepository) {

        this.jobDescriptionService = jobDescriptionService;
        this.resumeAnalyzerService = resumeAnalyzerService;
        this.resumeService = resumeService;
        this.aiService = aiService;
        this.userRepository = userRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    @PostMapping("/description")
    public List<String> recieveJd(
            @RequestBody JobDescriptionRequest request) {

        return jobDescriptionService.detectSkills(
                request.getJobDescription()
        );
    }

    @PostMapping("/match")
    public ResumeAnalysisResponse matchResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription ,
            Authentication authentication) throws Exception {

        if (jobDescription == null || jobDescription.trim().isEmpty()) {
            throw new IllegalArgumentException("Job description cannot be empty");
        }
        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        String resumeText = resumeService.extractText(file);

        if (resumeText == null || resumeText.trim().isEmpty()) {
            throw new IllegalArgumentException("Resume contains no readable text");
        }

        List<String> resumeSkills =
                resumeAnalyzerService.detectSkills(resumeText);

        List<String> jobSkills =
                jobDescriptionService.detectSkills(jobDescription);

        List<String> matchingSkills =
                resumeAnalyzerService.findMatchingSkills(
                        resumeSkills,
                        jobSkills
                );

        List<String> missingSkills =
                resumeAnalyzerService.findMissingJobSkills(
                        resumeSkills,
                        jobSkills
                );

        double matchScore =
                resumeAnalyzerService.calculateMatchScore(
                        resumeSkills,
                        jobSkills
                );

        List<String> suggestions =
                resumeAnalyzerService.generateSuggestions(missingSkills);

        AIAnalysisResponse aiAnalysis =
                aiService.analyzeResume(resumeText, jobDescription);

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();

        response.setSkills(resumeSkills);
        response.setMatchingSkills(matchingSkills);
        response.setMissingSkills(missingSkills);
        response.setMatchScore(matchScore);
        response.setSuggestions(suggestions);
        response.setAiAnalysis(aiAnalysis);

        ResumeAnalysis analysis = new ResumeAnalysis();

        analysis.setUser(user);
        analysis.setMatchScore(matchScore);
        analysis.setResumeText(resumeText);
        analysis.setJobDescription(jobDescription);
        analysis.setCreatedAt(LocalDateTime.now());

        System.out.println("CREATED AT BEFORE SAVE: " + analysis.getCreatedAt());
        resumeAnalysisRepository.save(analysis);

        return response;
    }
}