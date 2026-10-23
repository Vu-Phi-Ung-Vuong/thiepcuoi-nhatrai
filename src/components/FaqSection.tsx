import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface FaqSectionProps {
  config: WeddingConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config }) => {
  const faqs = config.faqs;
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) {
    return null; // Omit if no FAQs
  }

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      aria-label="Câu hỏi thường gặp"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-ivory-100 relative"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            QUESTIONS &amp; ANSWERS
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white border border-champagne-border/80 shadow-stationery transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                >
                  <span className="font-cormorant text-lg sm:text-xl text-ink font-normal tracking-wide pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-champagne-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-5 sm:px-6 overflow-hidden ${
                    isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-champagne-border/50 pt-4">
                    <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                      {faq.answer}
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
};
