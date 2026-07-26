// Simple line icons per category slug. Neutral, warm, not clip-art.
export function CategoryIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: string;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (slug) {
    case "sweets":
      return (
        <svg {...common}>
          <path d="M12 3c2 2 2 4 0 6s-2 4 0 6" />
          <path d="M5 21a7 7 0 0 1 14 0z" />
        </svg>
      );
    case "savory":
      return (
        <svg {...common}>
          <path d="M4 11h16a8 8 0 0 1-16 0z" />
          <path d="M12 11V4M9 6c0-1 3-1 3 0M2 21h20" />
        </svg>
      );
    case "pickles":
      return (
        <svg {...common}>
          <path d="M8 3h8M9 3v2.5L7.5 8A3 3 0 0 0 7 9.7V19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9.7a3 3 0 0 0-.5-1.7L15 5.5V3" />
          <path d="M7 13h10" />
        </svg>
      );
    case "spices":
      return (
        <svg {...common}>
          <path d="M10 2h4l-1 4h-2z" />
          <path d="M8 6h8l1 6a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />
          <path d="M9 22h6" />
        </svg>
      );
    case "bread-dough":
      return (
        <svg {...common}>
          <path d="M4 13a4 4 0 0 1 3-3.9 4 4 0 0 1 4-3.1 4 4 0 0 1 4 0 4 4 0 0 1 4 3.1A4 4 0 0 1 22 13c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M8 15l1 4M12 15v4M16 15l-1 4" />
        </svg>
      );
    case "household":
      return (
        <svg {...common}>
          <path d="M6 9a6 3 0 0 0 12 0v8a6 3 0 0 1-12 0z" />
          <path d="M6 9a6 3 0 0 1 12 0" />
          <path d="M9 3v3M15 3v3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
