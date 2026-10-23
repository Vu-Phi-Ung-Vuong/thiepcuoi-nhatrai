import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/date';
import type { CountdownTime } from '../utils/date';
import type { WeddingConfig } from '../types/wedding';

interface CountdownSectionProps {
  config: WeddingConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateTimeRemaining(config.weddingDateIso)
  );

  useEffect(() => {
    if (!config.weddingDateIso) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(config.weddingDateIso));
    }, 1000);

    return () => clearInterval(timer);
  }, [config.weddingDateIso]);

  // If no date or invalid date, hide section gracefully
  if (!config.weddingDateIso || !timeLeft.isValid) {
    return null;
  }

  return (
    <section
      id="countdown"
      aria-label="Đếm ngược đến ngày cưới"
      className="py-16 sm:py-24 px-4 sm:px-6 bg-ivory-200/60 relative overflow-hidden"
    >
      {/* Background delicate gold ornaments */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 sm:space-y-10">
        
        {/* Title */}
        <div className="space-y-2">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            SAVE THE DATE
          </p>
          <h2 className="font-cormorant text-2xl sm:text-4xl lg:text-5xl font-light text-ink tracking-wide">
            Đếm Ngược Đến Ngày Chung Đôi
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Message */}
        {config.countdownSubtext && (
          <p className="font-sans text-xs sm:text-sm text-ink-muted font-light tracking-wide max-w-md mx-auto">
            {config.countdownSubtext}
          </p>
        )}

        {/* Countdown Timer or Past Message */}
        {timeLeft.isPast ? (
          <div className="p-8 bg-ivory-50 border border-champagne-border max-w-lg mx-auto shadow-stationery">
            <p className="font-cormorant text-2xl sm:text-3xl italic text-ink font-light">
              Hôn lễ đã diễn ra trọn vẹn và ngập tràn hạnh phúc.
            </p>
            <p className="text-xs font-sans text-ink-muted mt-2 tracking-wider">
              Cảm ơn tất cả quý khách và những người thân yêu đã chúc phúc cho chúng mình.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto">
            
            {/* Days */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-white border border-champagne-border/80 shadow-stationery transition-transform duration-300 hover:-translate-y-1">
              <span className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-light text-ink">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-champagne-gold font-medium mt-1">
                Ngày
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-white border border-champagne-border/80 shadow-stationery transition-transform duration-300 hover:-translate-y-1">
              <span className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-light text-ink">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-champagne-gold font-medium mt-1">
                Giờ
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-white border border-champagne-border/80 shadow-stationery transition-transform duration-300 hover:-translate-y-1">
              <span className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-light text-ink">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-champagne-gold font-medium mt-1">
                Phút
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-white border border-champagne-border/80 shadow-stationery transition-transform duration-300 hover:-translate-y-1">
              <span className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-light text-champagne-gold">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-champagne-gold font-medium mt-1">
                Giây
              </span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
