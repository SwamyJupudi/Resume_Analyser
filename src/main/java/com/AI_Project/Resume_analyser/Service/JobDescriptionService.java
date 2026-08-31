package com.AI_Project.Resume_analyser.Service;

import com.AI_Project.Resume_analyser.Util.KnownSkills;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobDescriptionService {

    public List<String> detectSkills(String jobDescription) {

        List<String> detectedSkills = new ArrayList<>();

        for (String skill : KnownSkills.SKILLS) {

            if (jobDescription.toLowerCase().contains(skill.toLowerCase())) {
                detectedSkills.add(skill);
            }
        }

        return detectedSkills;
    }
}