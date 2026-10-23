import React from 'react';
import type { WeddingConfig } from '../types/wedding';

interface LoveStorySectionProps {
  config: WeddingConfig;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ config }) => {
  const milestones = config.loveStory;

  // Hide section if empty
  if (!milestones || milestones.length === 0) {
    return null;
  }

  return (
    <section
      id="love-story"
      aria-label="Câu chuyện tình yêu của chúng mình"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            OUR STORY
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            Câu Chuyện Của Chúng Mình
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Editorial Vertical Timeline */}
        <div className="relative">
          {/* Central Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-champagne-border/80 -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id || index}
                  className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Central Marker (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-ivory-50 border border-champagne-gold items-center justify-center shadow-sm z-10">
                    <span className="w-2 h-2 rounded-full bg-champagne-gold" />
                  </div>

                  {/* Photo Column (if photo exists) */}
                  <div className="w-full md:w-1/2">
                    {item.photo ? (
                      <div className="relative p-2 sm:p-3 bg-ivory-100 border border-champagne-border shadow-stationery max-w-sm mx-auto group overflow-hidden">
                        <div className="aspect-[3/4] overflow-hidden bg-ivory-200">
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        {item.photoCaption && (
                          <p className="text-[11px] font-sans text-ink-muted italic text-center mt-2">
                            {item.photoCaption}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* Narrative Text Column */}
                  <div
                    className={`w-full md:w-1/2 text-center ${
                      isEven ? 'md:text-left md:pl-6' : 'md:text-right md:pr-6'
                    }`}
                  >
                    <div className="space-y-2 max-w-md mx-auto">
                      {item.yearOrDate && (
                        <span className="inline-block px-3 py-1 bg-ivory-200/80 border border-champagne-border text-[11px] font-sans tracking-widest uppercase text-champagne-gold-dark font-medium">
                          {item.yearOrDate}
                        </span>
                      )}
                      <h3 className="font-cormorant text-2xl sm:text-3xl font-normal text-ink tracking-wide">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                        {item.story}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
