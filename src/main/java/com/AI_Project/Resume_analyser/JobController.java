package com.AI_Project.Resume_analyser;

import com.AI_Project.Resume_analyser.Service.JobDescriptionService;
import com.AI_Project.Resume_analyser.Service.ResumeAnalyzerService;
import com.AI_Project.Resume_analyser.Service.ResumeService;
import com.AI_Project.Resume_analyser.dto.JobDescriptionRequest;
import com.AI_Project.Resume_analyser.dto.ResumeAnalysisResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/job")
public class JobController {

    private final JobDescriptionService jobDescriptionService;
    private final ResumeAnalyzerService resumeAnalyzerService;
    private final ResumeService resumeService;
    public JobController(
            JobDescriptionService jobDescriptionService,
            ResumeAnalyzerService resumeAnalyzerService,
            ResumeService resumeService) {

        this.jobDescriptionService = jobDescriptionService;
        this.resumeAnalyzerService = resumeAnalyzerService;
        this.resumeService = resumeService;
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
            @RequestParam("jobDescription") String jobDescription) throws Exception {

        String resumeText = resumeService.extractText(file);

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

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();

        response.setSkills(resumeSkills);
        response.setMatchingSkills(matchingSkills);
        response.setMissingSkills(missingSkills);
        response.setMatchScore(matchScore);
        response.setSuggestions(suggestions);

        return response;
    }
}