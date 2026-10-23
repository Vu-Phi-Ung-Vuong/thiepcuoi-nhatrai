import React from 'react';
import { Camera, Heart, Wine, Sparkles, Users, Music } from 'lucide-react';
import type { WeddingConfig, DayTimelineItem } from '../types/wedding';

interface TimelineSectionProps {
  config: WeddingConfig;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ config }) => {
  const items = config.timeline;

  if (!items || items.length === 0) {
    return null; // Omit if no timeline items
  }

  const renderIcon = (iconName?: DayTimelineItem['iconName']) => {
    const props = { className: 'w-4 h-4 text-champagne-gold' };
    switch (iconName) {
      case 'camera':
        return <Camera {...props} />;
      case 'heart':
        return <Heart {...props} />;
      case 'wine':
        return <Wine {...props} />;
      case 'sparkles':
        return <Sparkles {...props} />;
      case 'users':
        return <Users {...props} />;
      case 'music':
        return <Music {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section
      id="timeline"
      aria-label="Lịch trình ngày cưới"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-ivory-200/50 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            SCHEDULE
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            Lịch Trình Ngày Cưới
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-0">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-px bg-champagne-border -translate-x-1/2" />

          <div className="space-y-10 sm:space-y-12">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id || idx}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Central Icon Marker */}
                  <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-ivory-50 border border-champagne-gold/70 flex items-center justify-center shadow-sm z-10">
                    {renderIcon(item.iconName)}
                  </div>

                  {/* Content Box */}
                  <div
                    className={`ml-10 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    }`}
                  >
                    <div className="p-5 bg-white border border-champagne-border/80 shadow-stationery space-y-1.5 transition-transform duration-300 hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-sans font-medium tracking-widest text-champagne-gold uppercase">
                        {item.time}
                      </span>
                      <h3 className="font-cormorant text-xl sm:text-2xl font-normal text-ink tracking-wide">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                          {item.description}
                        </p>
                      )}
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
