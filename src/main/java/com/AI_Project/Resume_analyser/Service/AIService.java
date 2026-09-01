package com.AI_Project.Resume_analyser.Service;

import com.AI_Project.Resume_analyser.dto.AIAnalysisResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final Client client;
    private final ObjectMapper objectMapper;

    public AIService() {
        client = new Client();
        objectMapper = new ObjectMapper();
    }

    public String testAI() {

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.1-flash-lite",
                        "Say hello to my Resume Analyzer project in one short sentence.",
                        null
                );

        return response.text();
    }

    public AIAnalysisResponse analyzeResume(
            String resumeText,
            String jobDescription) {

        String prompt = """
                You are an expert technical recruiter and resume analyst.

                Analyze the candidate's resume against the given job description.

                RESUME:
                %s

                JOB DESCRIPTION:
                %s

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use ```json.
                Do not add any text before or after the JSON.

                Use exactly this structure:

                {
                  "summary": "A concise overall assessment",
                  "strengths": [
                    "strength 1",
                    "strength 2"
                  ],
                  "weaknesses": [
                    "weakness 1",
                    "weakness 2"
                  ],
                  "recommendations": [
                    "recommendation 1",
                    "recommendation 2"
                  ]
                }

                Rules:
                - Base the analysis only on the provided resume and job description.
                - Do not invent skills, experience, projects, or qualifications.
                - Focus on relevance to the job.
                - Keep each item concise and useful.
                """.formatted(resumeText, jobDescription);

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.1-flash-lite",
                        prompt,
                        null
                );

        try {

            return objectMapper.readValue(
                    response.text(),
                    AIAnalysisResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini response",
                    e
            );
        }
    }
}