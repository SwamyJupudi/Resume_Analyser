package com.AI_Project.Resume_analyser.dto;

import java.time.LocalDateTime;

public class AnalysisHistoryResponse {

    private Long id;
    private double matchScore;
    private String jobDescription;
    private LocalDateTime createdAt;


    public AnalysisHistoryResponse(
            Long id,
            double matchScore,
            String jobDescription ,
            LocalDateTime createdAt) {

        this.id = id;
        this.matchScore = matchScore;
        this.jobDescription = jobDescription;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(double matchScore) {
        this.matchScore = matchScore;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}