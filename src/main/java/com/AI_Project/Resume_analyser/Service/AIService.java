package com.AI_Project.Resume_analyser.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final Client client;

    public AIService() {
        client = new Client();
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
}