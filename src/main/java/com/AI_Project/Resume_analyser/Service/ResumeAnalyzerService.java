package com.AI_Project.Resume_analyser.Service;

import com.AI_Project.Resume_analyser.dto.ResumeAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.AI_Project.Resume_analyser.Util.KnownSkills;
@Service
public class ResumeAnalyzerService {



    public List<String> detectSkills(String resumeText) {

        List<String> detectedSkills = new ArrayList<>();

        String text = resumeText.toLowerCase();

        for (String skill : KnownSkills.SKILLS) {

            String skillLower = skill.toLowerCase();

            if (skillLower.equals("c")) {

                if (text.matches(".*\\bc\\b.*")) {
                    detectedSkills.add(skill);
                }

            } else {

                if (text.contains(skillLower)) {
                    detectedSkills.add(skill);
                }
            }
        }

        return detectedSkills;
    }

    public ResumeAnalysisResponse analyzeResume(String resumeText) {

        List<String> detectedSkills = detectSkills(resumeText);
        List<String> missingSkills = findMissingSkills(detectedSkills);
        List<String> suggestions = generateSuggestions(missingSkills);

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();

        response.setSkills(detectedSkills);
        response.setMissingSkills(missingSkills);
        response.setSuggestions(suggestions);
        return response;
    }
    private double matchScore;

    public double getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(double matchScore) {
        this.matchScore = matchScore;
    }

    private List<String> findMissingSkills(List<String> detectedSkills) {

        List<String> missingSkills = new ArrayList<>();

        for (String skill : KnownSkills.SKILLS) {

            if (!detectedSkills.contains(skill)) {
                missingSkills.add(skill);
            }
        }

        return missingSkills;
    }

    public List<String> generateSuggestions(List<String> missingSkills) {

        List<String> suggestions = new ArrayList<>();

        for (String skill : missingSkills) {
            suggestions.add("Consider learning " + skill);
        }

        return suggestions;
    }

    public List<String> findMatchingSkills(
            List<String> resumeSkills,
            List<String> jobSkills) {

        List<String> matchingSkills = new ArrayList<>();

        for (String skill : jobSkills) {

            if (resumeSkills.contains(skill)) {
                matchingSkills.add(skill);
            }
        }

        return matchingSkills;
    }

    public List<String> findMissingJobSkills(
            List<String> resumeSkills,
            List<String> jobSkills) {

        List<String> missingSkills = new ArrayList<>();

        for (String skill : jobSkills) {

            if (!resumeSkills.contains(skill)) {
                missingSkills.add(skill);
            }
        }

        return missingSkills;
    }

    public double calculateMatchScore(
            List<String> resumeSkills,
            List<String> jobSkills) {

        if (jobSkills.isEmpty()) {
            return 0;
        }

        int matchingCount = 0;

        for (String skill : jobSkills) {

            if (resumeSkills.contains(skill)) {
                matchingCount++;
            }
        }

        return ((double) matchingCount / jobSkills.size()) * 100;
    }
}