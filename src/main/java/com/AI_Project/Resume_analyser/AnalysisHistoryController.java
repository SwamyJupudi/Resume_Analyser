package com.AI_Project.Resume_analyser;

import com.AI_Project.Resume_analyser.Model.ResumeAnalysis;
import com.AI_Project.Resume_analyser.Model.User;
import com.AI_Project.Resume_analyser.Repository.ResumeAnalysisRepository;
import com.AI_Project.Resume_analyser.Repository.UserRepository;
import com.AI_Project.Resume_analyser.dto.AnalysisHistoryResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisHistoryController {

    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final UserRepository userRepository;

    public AnalysisHistoryController(
            ResumeAnalysisRepository resumeAnalysisRepository,
            UserRepository userRepository) {

        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/history")
    public List<AnalysisHistoryResponse> getHistory(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        List<ResumeAnalysis> analyses =
                resumeAnalysisRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        return analyses.stream()
                .map(analysis ->
                        new AnalysisHistoryResponse(
                                analysis.getId(),
                                analysis.getMatchScore(),
                                analysis.getJobDescription() ,
                                analysis.getCreatedAt()
                        )
                )
                .toList();
    }

    @GetMapping("/{id}")
    public AnalysisHistoryResponse getAnalysis(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        ResumeAnalysis analysis =
                resumeAnalysisRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException("Analysis not found"));

        if (!analysis.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You are not allowed to access this analysis");
        }

        return new AnalysisHistoryResponse(
                analysis.getId(),
                analysis.getMatchScore(),
                analysis.getJobDescription(),
                analysis.getCreatedAt()
        );
    }

    @DeleteMapping("/{id}")
    public String deleteAnalysis(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        ResumeAnalysis analysis =
                resumeAnalysisRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException("Analysis not found"));

        if (!analysis.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException(
                    "You are not allowed to delete this analysis");
        }

        resumeAnalysisRepository.delete(analysis);

        return "Analysis deleted successfully";
    }
}