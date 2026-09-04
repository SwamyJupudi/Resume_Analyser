// A small, consistent icon set built as plain inline SVG. The project has
// no icon library installed (package.json only has react/react-dom/
// react-router-dom/axios), so these avoid adding a new dependency for a
// handful of glyphs. Style: 24x24 viewBox, stroke-only, currentColor.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconDocument(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h3" />
    </svg>
  );
}

export function IconBriefcase(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <rect x="3" y="7.5" width="18" height="12" rx="1.5" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

export function IconTarget(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconListChecks(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="m4 6 1.5 1.5L8 5" />
      <path d="m4 12 1.5 1.5L8 11" />
      <path d="m4 18 1.5 1.5L8 17" />
      <path d="M11 6h9M11 12h9M11 18h9" />
    </svg>
  );
}

export function IconSparkles(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M11 3v3M11 15v3M4 10h3M15 10h3" />
      <path d="M11 5.5 12.6 9 16 10.6 12.6 12.2 11 15.7 9.4 12.2 6 10.6 9.4 9Z" />
      <path d="M18 15.5v2M17 17.5h2" />
    </svg>
  );
}

export function IconHistory(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export function IconUpload(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function IconLayers(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="m12 4 8 4.2-8 4.2-8-4.2Z" />
      <path d="m4 12.5 8 4.2 8-4.2" />
      <path d="m4 16.8 8 4.2 8-4.2" />
    </svg>
  );
}

export function IconAlertTriangleMinus(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M12 4 2.5 20h19Z" />
      <path d="M9.5 16.2h5" />
    </svg>
  );
}

export function IconBulb(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.15 1 1.9v.7h5v-.7c0-.75.4-1.45 1-1.9A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg {...base} width={props.size || 24} height={props.size || 24} className={props.className} aria-hidden="true">
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}



