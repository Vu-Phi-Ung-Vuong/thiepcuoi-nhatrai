import React from 'react';
import type { WeddingConfig } from '../types/wedding';

interface DressCodeSectionProps {
  config: WeddingConfig;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ config }) => {
  const dressCode = config.dressCode;

  if (!dressCode || (!dressCode.description && (!dressCode.colors || dressCode.colors.length === 0))) {
    return null; // Omit if no dress code configured
  }

  return (
    <section
      id="dress-code"
      aria-label="Gợi ý trang phục"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            DRESS CODE
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            {dressCode.title || 'Trang Phục Gợi Ý'}
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Message */}
        <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light max-w-xl mx-auto">
          {dressCode.description ||
            'Chúng mình rất vui khi được đón bạn trong diện mạo thật rạng rỡ và thanh lịch.'}
        </p>

        {/* Color Palette Swatches */}
        {dressCode.colors && dressCode.colors.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
            {dressCode.colors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 group">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                  style={{
                    backgroundColor: color.hex,
                    border: color.border ? '1px solid #E6D8C1' : '1px solid rgba(0,0,0,0.06)',
                  }}
                />
                <span className="text-[11px] font-sans tracking-wider text-ink-muted group-hover:text-ink">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Dress code note */}
        {dressCode.note && (
          <div className="pt-4 max-w-md mx-auto">
            <p className="text-xs font-sans text-champagne-gold-dark italic border-t border-champagne-border/40 pt-4">
              {dressCode.note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
