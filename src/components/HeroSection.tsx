import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { downloadIcsFile } from '../utils/calendar';

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const groomName = config.couple.groom.fullName || config.couple.groom.shortName;
  const brideName = config.couple.bride.fullName || config.couple.bride.shortName;
  const hasNames = Boolean(groomName && brideName);
  const isBrideFirst =
    config.partyType === 'nhagai' ||
    Boolean(config.events?.[0]?.title?.toLowerCase().includes('vu quy'));
  const firstName = isBrideFirst ? brideName : groomName;
  const secondName = isBrideFirst ? groomName : brideName;
  const heroImage = config.hero.heroImage;
  const weddingDateDisplay = config.weddingDateDisplay;

  const handleSaveDate = () => {
    if (config.weddingDateIso) {
      downloadIcsFile({
        title: `Lễ Cưới ${hasNames ? `${firstName} & ${secondName}` : 'Hạnh Phúc'}`,
        description: config.hero.invitationQuote || 'Trân trọng kính mời quý khách tham dự ngày vui của chúng mình.',
        startDateIso: config.weddingDateIso,
      });
    } else {
      const eventsEl = document.querySelector('#events');
      if (eventsEl) {
        eventsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollDown = () => {
    const nextSection =
      document.querySelector('#couple') ||
      document.querySelector('#countdown') ||
      document.querySelector('#events') ||
      document.querySelector('#gallery');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Lời mở đầu thiệp cưới"
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-12 px-4 sm:px-6 overflow-hidden bg-ivory-100"
    >
      {/* Background subtle texture */}
      <div className="absolute inset-0 paper-texture opacity-60 pointer-events-none" />

      {/* Decorative top gold ornament */}
      <div className="relative z-10 pt-4 flex flex-col items-center text-center space-y-2 max-w-xl mx-auto">
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] uppercase text-champagne-gold font-medium">
          {config.hero.greeting || 'TRÂN TRỌNG KÍNH MỜI'}
        </span>
        <div className="w-16 h-px gold-divider" />
      </div>

      {/* Central Editorial Visual & Typography */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 sm:space-y-8 w-full">
        
        {/* Couple Names (Render only if configured) */}
        {hasNames && (
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light text-ink tracking-wide leading-none">
              {firstName}
            </h1>
            <div className="flex items-center justify-center gap-4 py-1">
              <span className="w-8 sm:w-16 h-px bg-champagne-border" />
              <span className="font-script text-2xl sm:text-4xl text-champagne-gold">
                &amp;
              </span>
              <span className="w-8 sm:w-16 h-px bg-champagne-border" />
            </div>
            <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light text-ink tracking-wide leading-none">
              {secondName}
            </h1>
          </div>
        )}

        {/* Hero Photo: w-fit hugging container eliminates any extra white space */}
        {heroImage && (
          <div className="relative w-fit max-w-[90vw] mx-auto my-1 p-2.5 sm:p-3.5 bg-white shadow-stationery-lg border border-champagne-border/80">
            <div className="relative overflow-hidden bg-ivory-200">
              <img
                src={heroImage}
                alt={hasNames ? `Ảnh cưới ${groomName} và ${brideName}` : 'Ảnh cưới cô dâu chú rể'}
                className="max-h-[58vh] sm:max-h-[68vh] w-auto h-auto max-w-[82vw] sm:max-w-md object-contain block mx-auto transform transition-transform duration-1000 hover:scale-[1.02]"
                loading="eager"
              />
              {/* Fine Inner Accent Border inside photo */}
              <div className="absolute inset-3 sm:inset-4 border border-white/40 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Quotes & Editorial Text */}
        <div className="space-y-3 max-w-lg mx-auto">
          {config.hero.invitationQuote && (
            <p className="font-cormorant text-xl sm:text-2xl italic text-ink font-normal leading-relaxed">
              &ldquo;{config.hero.invitationQuote}&rdquo;
            </p>
          )}

          {config.hero.subQuote && (
            <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light tracking-wide px-4">
              {config.hero.subQuote}
            </p>
          )}
        </div>

        {/* Wedding Date & Action Buttons (if configured) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          {weddingDateDisplay && (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-champagne-border bg-ivory-50 text-xs sm:text-sm font-sans tracking-widest text-ink font-light">
              <Calendar className="w-4 h-4 text-champagne-gold" />
              <span>{weddingDateDisplay}</span>
            </div>
          )}

          {config.weddingDateIso && (
            <button
              onClick={handleSaveDate}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-champagne-gold text-white text-xs sm:text-sm font-sans tracking-widest uppercase hover:bg-champagne-gold-dark transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              <span>{config.hero.saveTheDateButtonText || 'Lưu ngày cưới'}</span>
            </button>
          )}
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 flex flex-col items-center pt-6">
        <button
          onClick={handleScrollDown}
          aria-label="Cuộn xuống để xem tiếp"
          className="group flex flex-col items-center text-ink-muted hover:text-champagne-gold transition-colors focus:outline-none cursor-pointer"
        >
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-muted group-hover:text-champagne-gold transition-colors mb-1">
            Khám phá tiếp
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-champagne-gold" />
        </button>
      </div>
    </section>
  );
};
