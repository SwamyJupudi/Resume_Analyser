// Purpose-built illustration for the hero section: a resume and a job
// description feeding into a match score, with an AI insights card
// alongside. Deliberately not a chatbot/robot graphic — the goal is to
// visually explain "resume + job description -> score + AI feedback."
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 460 380"
      width="100%"
      height="100%"
      role="img"
      aria-label="Illustration of a resume and job description being compared to produce a match score and AI insights"
    >
      <defs>
        <linearGradient id="heroRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="#3f7a6c" />
        </linearGradient>
      </defs>

      {/* soft backdrop shape */}
      <rect x="0" y="0" width="460" height="380" rx="28" fill="var(--accent-soft)" opacity="0.55" />

      {/* Resume card (left) */}
      <g transform="translate(28,48)">
        <rect x="0" y="0" width="132" height="168" rx="12" fill="var(--surface)" stroke="var(--line)" />
        <rect x="18" y="22" width="60" height="8" rx="4" fill="var(--ink)" opacity="0.85" />
        <rect x="18" y="38" width="40" height="6" rx="3" fill="var(--ink-muted)" opacity="0.6" />
        <rect x="18" y="60" width="96" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="18" y="72" width="96" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="18" y="84" width="70" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="18" y="104" width="96" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="18" y="116" width="96" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="18" y="128" width="55" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="18" y="146" width="26" height="14" rx="7" fill="var(--accent-soft)" />
        <rect x="50" y="146" width="26" height="14" rx="7" fill="var(--accent-soft)" />
        <rect x="82" y="146" width="26" height="14" rx="7" fill="var(--warn-soft)" />
      </g>

      {/* Job description card (bottom-left, slightly overlapping) */}
      <g transform="translate(70,224)">
        <rect x="0" y="0" width="120" height="100" rx="12" fill="var(--surface)" stroke="var(--line)" />
        <rect x="16" y="16" width="52" height="7" rx="3.5" fill="var(--ink)" opacity="0.85" />
        <rect x="16" y="34" width="88" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="16" y="46" width="88" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="16" y="58" width="60" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="16" y="76" width="24" height="12" rx="6" fill="var(--accent-soft)" />
      </g>

      {/* connecting lines into the score ring */}
      <path d="M160 130 C 210 130, 210 150, 250 168" stroke="var(--line-strong)" strokeWidth="2" fill="none" />
      <path d="M190 260 C 230 250, 240 220, 260 200" stroke="var(--line-strong)" strokeWidth="2" fill="none" />

      {/* Score ring (right) */}
      <g transform="translate(268,96)">
        <circle cx="70" cy="70" r="62" fill="var(--surface)" stroke="var(--line)" />
        <circle cx="70" cy="70" r="52" fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r="52"
          fill="none"
          stroke="url(#heroRing)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="326.7"
          strokeDashoffset="88"
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="66" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="30" fill="var(--ink)">
          73%
        </text>
        <text
          x="70"
          y="86"
          textAnchor="middle"
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="10.5"
          letterSpacing="0.06em"
          fill="var(--ink-muted)"
        >
          MATCH
        </text>
      </g>

      {/* AI insight card (top-right) */}
      <g transform="translate(300,10)">
        <rect x="0" y="0" width="140" height="62" rx="10" fill="var(--surface)" stroke="var(--line)" />
        <circle cx="18" cy="18" r="7" fill="var(--accent-soft)" />
        <path
          d="M18 12.5 19 16.5 23 17.5 19 18.5 18 22.5 17 18.5 13 17.5 17 16.5Z"
          fill="var(--accent)"
          transform="translate(-3,-3) scale(0.7)"
        />
        <rect x="34" y="13" width="66" height="6" rx="3" fill="var(--ink)" opacity="0.8" />
        <rect x="16" y="32" width="108" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="16" y="43" width="86" height="5" rx="2.5" fill="var(--line-strong)" />
      </g>

      {/* skill chips near the bottom */}
      <g transform="translate(198,320)">
        <rect x="0" y="0" width="58" height="20" rx="10" fill="var(--good-soft)" />
        <text x="29" y="14" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="var(--good)">
          Java
        </text>
        <rect x="66" y="0" width="76" height="20" rx="10" fill="var(--good-soft)" />
        <text x="104" y="14" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="var(--good)">
          Spring Boot
        </text>
        <rect x="150" y="0" width="70" height="20" rx="10" fill="var(--warn-soft)" />
        <text x="185" y="14" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="var(--warn)">
          Docker
        </text>
      </g>
    </svg>
  );
}
