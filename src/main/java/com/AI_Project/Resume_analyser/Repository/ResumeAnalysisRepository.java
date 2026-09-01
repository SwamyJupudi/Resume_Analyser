package com.AI_Project.Resume_analyser.Repository;

import com.AI_Project.Resume_analyser.Model.ResumeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeAnalysisRepository
        extends JpaRepository<ResumeAnalysis, Long> {

    List<ResumeAnalysis> findByUserIdOrderByCreatedAtDesc(Long userId);
}