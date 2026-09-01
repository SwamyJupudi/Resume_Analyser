package com.AI_Project.Resume_analyser.dto;

import java.util.List;
import com.AI_Project.Resume_analyser.dto.AIAnalysisResponse;

public class ResumeAnalysisResponse {


    private List<String> skills;

    private List<String> matchingSkills;

    private List<String> missingSkills;

    private List<String> suggestions;

    private double matchScore;

    private AIAnalysisResponse aiAnalysis;

    public AIAnalysisResponse getAiAnalysis() {
        return aiAnalysis;
    }

    public void setAiAnalysis(AIAnalysisResponse aiAnalysis) {
        this.aiAnalysis = aiAnalysis;
    }

    public void setMatchScore(double matchScore) {
        this.matchScore = matchScore;
    }

    public double getMatchScore() {
        return matchScore;
    }


    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }


    public List<String> getMatchingSkills() {
        return matchingSkills;
    }

    public void setMatchingSkills(List<String> matchingSkills) {
        this.matchingSkills = matchingSkills;
    }


    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }


    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}