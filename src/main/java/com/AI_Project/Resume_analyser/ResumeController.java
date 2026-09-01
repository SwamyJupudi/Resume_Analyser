package com.AI_Project.Resume_analyser;


import com.AI_Project.Resume_analyser.Service.ResumeAnalyzerService;
import com.AI_Project.Resume_analyser.Service.ResumeService;
import com.AI_Project.Resume_analyser.dto.ResumeAnalysisResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeAnalyzerService resumeAnalyzerService;

    public ResumeController(ResumeService resumeService , ResumeAnalyzerService resumeAnalyzerService) {
        this.resumeService = resumeService;
        this.resumeAnalyzerService = resumeAnalyzerService;
    }

    @PostMapping("/upload")
    public String uploadResume(
            @RequestParam("file") MultipartFile file) throws Exception {

        return resumeService.extractText(file);
    }

    @PostMapping("/analyze")
    public ResumeAnalysisResponse analyzeResume(
            @RequestParam("file") MultipartFile file) {

        try {

            String resumeText = resumeService.extractText(file);

            return resumeAnalyzerService.analyzeResume(resumeText);

        } catch (Exception e) {

            throw new RuntimeException("Error analyzing resume", e);
        }
    }
}