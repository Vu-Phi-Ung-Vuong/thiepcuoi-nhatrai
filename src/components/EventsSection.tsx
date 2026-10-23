import React from 'react';
import { Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';
import type { WeddingConfig, WeddingEvent } from '../types/wedding';
import { downloadIcsFile } from '../utils/calendar';

interface EventsSectionProps {
  config: WeddingConfig;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ config }) => {
  const events = config.events?.filter(
    (ev) => ev.title && (ev.venueName || ev.address || ev.date || ev.timeDisplay)
  );

  if (!events || events.length === 0) {
    return null; // Omit completely if no event configured
  }

  const handleDownloadCalendar = (ev: WeddingEvent) => {
    if (!ev.startTimeIso) return;
    downloadIcsFile({
      title: ev.title,
      description: `${ev.subtitle ? `${ev.subtitle}. ` : ''}${ev.note || 'Trân trọng kính mời quý khách tham dự.'}`,
      location: `${ev.venueName ? `${ev.venueName}, ` : ''}${ev.address || ''}`,
      startDateIso: ev.startTimeIso,
      endDateIso: ev.endTimeIso,
    });
  };

  return (
    <section
      id="events"
      aria-label="Thông tin buổi lễ và tiệc mừng"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            WEDDING DETAILS
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            Thông Tin Buổi Lễ
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Events Grid */}
        <div
          className={`grid gap-8 lg:gap-12 ${
            events.length === 1
              ? 'max-w-xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 items-stretch'
          }`}
        >
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col justify-between p-8 sm:p-10 bg-ivory-100 border border-champagne-border/90 shadow-stationery relative overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(#E6D8C1 0.4px, transparent 0.4px)`,
                backgroundSize: '16px 16px',
              }}
            >
              {/* Corner fine accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-champagne-gold/60 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-champagne-gold/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-champagne-gold/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-champagne-gold/60 pointer-events-none" />

              <div className="space-y-6">
                {/* Event Heading */}
                <div className="text-center space-y-1 pb-2 border-b border-champagne-border/60">
                  {ev.subtitle && (
                    <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne-gold font-medium">
                      {ev.subtitle}
                    </span>
                  )}
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-ink font-normal tracking-wide">
                    {ev.title}
                  </h3>
                </div>

                {/* Event Details Items */}
                <div className="space-y-4">
                  {/* Date & Time */}
                  {(ev.date || ev.timeDisplay) && (
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-ivory-50 border border-champagne-border flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-champagne-gold" />
                      </div>
                      <div>
                        {ev.timeDisplay && (
                          <p className="font-cormorant text-lg text-ink font-medium">
                            {ev.timeDisplay}
                          </p>
                        )}
                        {ev.date && (
                          <p className="text-xs font-sans text-ink-muted tracking-wider">
                            {ev.date}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Venue & Address */}
                  {(ev.venueName || ev.address) && (
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-ivory-50 border border-champagne-border flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-champagne-gold" />
                      </div>
                      <div>
                        {ev.venueName && (
                          <p className="font-cormorant text-lg text-ink font-medium">
                            {ev.venueName}
                          </p>
                        )}
                        {ev.address && (
                          <p className="text-xs font-sans text-ink-muted leading-relaxed font-light">
                            {ev.address}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dress code note if specific to this event */}
                  {ev.dressCode && (
                    <p className="text-xs font-sans text-champagne-gold-dark italic pl-11">
                      Trang phục gợi ý: {ev.dressCode}
                    </p>
                  )}

                  {/* Warm Note */}
                  {ev.note && (
                    <p className="text-xs font-sans text-ink-muted/90 italic leading-relaxed pt-2 border-t border-champagne-border/40 text-center">
                      &ldquo;{ev.note}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: Chỉ đường & Thêm vào lịch */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                {ev.mapUrl && (
                  <a
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ivory-50 text-ink border border-champagne-gold text-xs font-sans tracking-widest uppercase hover:bg-champagne/40 transition-colors shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>Chỉ đường</span>
                  </a>
                )}

                {ev.startTimeIso && (
                  <button
                    onClick={() => handleDownloadCalendar(ev)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-champagne-gold text-white text-xs font-sans tracking-widest uppercase hover:bg-champagne-gold-dark transition-colors shadow-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Thêm vào lịch</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
