"use client";

import { useState } from "react";
import { FAQ } from "@/lib/data";
import { Eyebrow } from "@/components/ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
          The parts people usually push back on.
        </h2>

        <div className="border-border mt-12 border-t">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-border border-b">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={`font-display text-base font-semibold transition-colors sm:text-lg ${
                      isOpen ? "text-accent-blue" : "text-foreground group-hover:text-accent-blue"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`border-border text-foreground-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "bg-accent-blue border-accent-blue rotate-45 text-white" : ""
                    }`}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-foreground-muted max-w-3xl pb-6 text-sm leading-relaxed sm:text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
