import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Card } from "../components/ui/Primitives";
import { ScoreRing } from "../components/ui/ScoreRing";
import { PublicNavbar } from "../components/home/PublicNavbar";
import { PublicFooter } from "../components/home/Footer";
import { HeroIllustration } from "../components/home/HeroIllustration";
import {
  IconUpload,
  IconBriefcase,
  IconTarget,
  IconBulb,
  IconListChecks,
  IconLayers,
  IconAlertTriangleMinus,
  IconSparkles,
  IconHistory,
  IconArrowRight,
} from "../components/home/Icons";

// Every item here maps 1:1 to something the backend actually does —
// no invented capabilities. See:
//   - Resume skill detection      -> ResumeAnalyzerService.detectSkills
//   - JD skill extraction         -> JobDescriptionService.detectSkills
//   - Resume vs job matching      -> POST /api/job/match
//   - Match score                 -> ResumeAnalyzerService.calculateMatchScore
//   - Missing skill detection     -> findMissingJobSkills
//   - Improvement suggestions     -> generateSuggestions
//   - AI-powered resume feedback  -> AIService (Gemini) via aiAnalysis
//   - Analysis history            -> GET/DELETE /api/analysis
const FEATURES = [
  {
    icon: IconListChecks,
    title: "Resume skill detection",
    description: "Automatically pulls the skills out of your uploaded resume.",
  },
  {
    icon: IconBriefcase,
    title: "Job description skill extraction",
    description: "Reads a pasted job description and identifies the skills it's asking for.",
  },
  {
    icon: IconLayers,
    title: "Resume vs job matching",
    description: "Compares both skill sets directly against each other.",
  },
  {
    icon: IconTarget,
    title: "Match score",
    description: "A single, clear score showing how closely you align with the role.",
  },
  {
    icon: IconAlertTriangleMinus,
    title: "Missing skill detection",
    description: "Surfaces exactly which requested skills aren't showing up in your resume.",
  },
  {
    icon: IconBulb,
    title: "Improvement suggestions",
    description: "Practical, skill-specific suggestions based on what's missing.",
  },
  {
    icon: IconSparkles,
    title: "AI-powered resume feedback",
    description: "A narrative summary plus strengths, weaknesses, and recommendations.",
  },
  {
    icon: IconHistory,
    title: "Analysis history",
    description: "Every past comparison saved, with its score and job description.",
  },
];

const STEPS = [
  {
    number: "01",
    icon: IconUpload,
    title: "Upload your resume",
    description: "PDF or DOCX — the text is extracted automatically.",
  },
  {
    number: "02",
    icon: IconBriefcase,
    title: "Add the job description",
    description: "Paste in the role you're targeting.",
  },
  {
    number: "03",
    icon: IconTarget,
    title: "Analyze your match",
    description: "Get a match score plus matching and missing skills.",
  },
  {
    number: "04",
    icon: IconBulb,
    title: "Understand what to improve",
    description: "Read concrete suggestions and AI-generated feedback.",
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const primaryCtaTo = isAuthenticated ? "/analyze" : "/register";

  return (
    <div className="public-page">
      <PublicNavbar />

      {/* HERO */}
      <section className="hero-section" id="home">
        <div className="hero-section-inner">
          <div className="hero-copy">
            <h1>
              Not sure how well your resume fits the job?
            </h1>
            <p className="hero-sub">
              Upload your resume and a target job description to get a clear match
              score, a breakdown of matching and missing skills, and AI-backed
              feedback on where to focus next.
            </p>
            <div className="hero-cta-row">
              <Button as={Link} to={primaryCtaTo}>
                Analyze my resume
                <IconArrowRight size={18} />
              </Button>
              <Button as="a" href="#how-it-works" variant="secondary">
                See how it works
              </Button>
            </div>
          </div>
          <div className="hero-visual">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* TRUST / VALUE STRIP */}
      <section className="value-strip">
        <div className="value-strip-inner">
          <span>Resume</span>
          <IconArrowRight size={16} className="value-strip-arrow" />
          <span>Job description</span>
          <IconArrowRight size={16} className="value-strip-arrow" />
          <span>Match score</span>
          <IconArrowRight size={16} className="value-strip-arrow" />
          <span>AI insights</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div className="section-inner">
          <div className="section-heading">
            <div className="section-eyebrow">How it works</div>
            <h2>From upload to insight in one pass</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((step) => (
              <div className="step-card" key={step.number}>
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <step.icon size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section section-tinted" id="features">
        <div className="section-inner">
          <div className="section-heading">
            <div className="section-eyebrow">Features</div>
            <h2>What the analysis actually covers</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={22} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI ANALYSIS PREVIEW */}
      <section className="section">
        <div className="section-inner ai-preview-inner">
          <div className="section-heading" style={{ textAlign: "left", marginBottom: 0 }}>
            <div className="section-eyebrow">AI insights</div>
            <h2>Feedback that reads like a mentor, not a chatbot</h2>
            <p className="section-lead">
              Alongside the score and skill breakdown, you get a written summary,
              your strengths, your gaps, and specific next steps — generated for
              your resume and the job you're targeting.
            </p>
          </div>
          <Card className="ai-preview-card">
            <div className="ai-preview-tag">Example preview — not real analysis data</div>
            <div className="ai-block">
              <h3>Summary</h3>
              <p className="ai-summary">
                This resume shows strong backend fundamentals that line up well with
                the role, with a couple of gaps worth addressing before applying.
              </p>
            </div>
            <div className="ai-two-col">
              <div className="ai-block">
                <h3>Strengths</h3>
                <div className="suggestions-list">
                  <div className="suggestion-item">Solid Java and Spring Boot experience</div>
                  <div className="suggestion-item">Clear, well-structured project history</div>
                </div>
              </div>
              <div className="ai-block">
                <h3>Weaknesses</h3>
                <div className="suggestions-list">
                  <div className="suggestion-item">No visible cloud deployment experience</div>
                  <div className="suggestion-item">Docker isn't mentioned anywhere</div>
                </div>
              </div>
            </div>
            <div className="ai-block">
              <h3>Recommendations</h3>
              <div className="suggestions-list">
                <div className="suggestion-item">Add a small project demonstrating Docker or containerization</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* MATCH SCORE VISUAL */}
      <section className="section section-tinted">
        <div className="section-inner score-section-inner">
          <div className="score-section-visual">
            <ScoreRing score={67} />
          </div>
          <div>
            <div className="section-eyebrow">Match score</div>
            <h2>See exactly how close you are</h2>
            <p className="section-lead">
              The score reflects how much overlap exists between the skills in
              your resume and the skills the job description asks for — the same
              score you'll see for your own analysis, calculated from your own
              resume and job description.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Ready to understand your resume better?</h2>
          <p>Turn your resume into a clearer plan for your next opportunity.</p>
          <Button as={Link} to={isAuthenticated ? "/analyze" : "/register"} className="final-cta-button">
            Start analyzing my resume
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
