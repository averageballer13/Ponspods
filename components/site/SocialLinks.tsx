const LINKS = [
  {
    label: "Whitepaper",
    href: "/ponspods-whitepaper.pdf",
    external: false,
    // document with a folded corner
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
  },
  {
    label: "GitHub",
    href: "https://github.com/averageballer13/Ponspods",
    external: true,
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22",
  },
  {
    label: "X",
    href: "https://x.com/ponspods",
    external: true,
    d: "M17.7 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.8L4.2 21H.9l7.7-8.8L.6 3h6.8l4.7 6.2zm-1.2 16h1.8L7.6 4.8H5.7z",
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          aria-label={l.label}
          title={l.label}
          {...(l.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          className="border-line hover:border-lime/60 hover:text-lime flex h-11 w-11 items-center justify-center rounded-full border bg-[#070f05]/70 text-white/60 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={l.label === "X" ? "currentColor" : "none"}
            stroke={l.label === "X" ? "none" : "currentColor"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={l.d} />
          </svg>
        </a>
      ))}
    </div>
  );
}
