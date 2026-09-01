package com.AI_Project.Resume_analyser.Service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;

@Service
public class ResumeService {

    public String extractText(MultipartFile file) throws Exception {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is empty");
        }

        String fileName = file.getOriginalFilename();

        if (fileName == null) {
            throw new IllegalArgumentException("Invalid file");
        }

        if (fileName.toLowerCase().endsWith(".pdf")) {

            try (PDDocument document = Loader.loadPDF(file.getBytes())) {

                PDFTextStripper stripper = new PDFTextStripper();

                return stripper.getText(document);
            }

        } else if (fileName.toLowerCase().endsWith(".docx")) {

            try (XWPFDocument document =
                         new XWPFDocument(
                                 new ByteArrayInputStream(file.getBytes()))) {

                StringBuilder text = new StringBuilder();

                document.getParagraphs().forEach(paragraph ->
                        text.append(paragraph.getText()).append("\n"));

                return text.toString();
            }

        } else {
            throw new IllegalArgumentException(
                    "Only PDF and DOCX files are supported");
        }
    }
}