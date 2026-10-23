import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { useAudio } from '../context/AudioContext';

interface OpeningEnvelopeProps {
  config: WeddingConfig;
  onOpenComplete: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ config, onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { playMusic } = useAudio();

  const groomName = config.couple.groom.fullName || config.couple.groom.shortName;
  const brideName = config.couple.bride.fullName || config.couple.bride.shortName;
  const hasNames = Boolean(groomName && brideName);
  const isBrideFirst =
    config.partyType === 'nhagai' ||
    Boolean(config.events?.[0]?.title?.toLowerCase().includes('vu quy'));
  const firstName = isBrideFirst ? brideName : groomName;
  const secondName = isBrideFirst ? groomName : brideName;
  const rawDateDisplay = config.weddingDateDisplay;

  // Đối với thiệp cưới nhà gái: phần thiệp mời ban đầu chỉ giữ lại ngày dương (12-12-2026), phần ngày âm phía sau bỏ
  const envelopeDateDisplay =
    config.opening.dateDisplay ||
    (isBrideFirst && rawDateDisplay
      ? rawDateDisplay.split('(')[0].trim()
      : rawDateDisplay);

  // Định dạng ngày phong bì mềm mại, thanh thoát theo phong cách typography cưới cao cấp
  const formattedEnvelopeDate = envelopeDateDisplay
    ? envelopeDateDisplay
        .replace(/[-.]/g, ' • ')
        .replace(/\s+/g, ' ')
        .trim()
    : '';

  // Monogram calculation
  const monogram =
    config.couple.monogram ||
    (config.couple.groom.initial && config.couple.bride.initial
      ? `${config.couple.groom.initial} & ${config.couple.bride.initial}`
      : 'W & I');

  const handleOpen = async () => {
    if (isOpening) return;
    setIsOpening(true);

    // 1. Attempt to play background music immediately on user gesture
    playMusic();

    // 2. Launch subtle, refined champagne-gold petal & streamer shimmer
    try {
      // Center burst
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#C8AE83', '#E6D8C1', '#F5F0E8', '#D4AF37', '#DFB89C'],
        ticks: 240,
        gravity: 0.7,
        scalar: 0.9,
        disableForReducedMotion: true,
      });

      // Side celebratory streamers at 250ms
      setTimeout(() => {
        confetti({
          particleCount: 22,
          angle: 60,
          spread: 55,
          origin: { x: 0.05, y: 0.7 },
          colors: ['#C8AE83', '#E6D8C1', '#D4AF37', '#FBF9F5'],
          ticks: 260,
          gravity: 0.65,
          scalar: 0.95,
        });
        confetti({
          particleCount: 22,
          angle: 120,
          spread: 55,
          origin: { x: 0.95, y: 0.7 },
          colors: ['#C8AE83', '#E6D8C1', '#D4AF37', '#FBF9F5'],
          ticks: 260,
          gravity: 0.65,
          scalar: 0.95,
        });
      }, 250);
    } catch {
      // Ignore if confetti fails
    }

    // 3. Smooth transition timing
    setTimeout(() => {
      setIsDone(true);
      onOpenComplete();
    }, 1400);
  };

  const handleSkip = () => {
    playMusic();
    setIsDone(true);
    onOpenComplete();
  };

  if (isDone) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thiệp mời trực tuyến"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-ivory-200/95 backdrop-blur-xl transition-all duration-1000 ${
        isOpening ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-ivory-100 to-champagne/40 pointer-events-none" />

      {/* Skip button top right */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 text-xs font-sans tracking-widest uppercase text-ink-muted/80 hover:text-champagne-gold transition-colors py-2 px-3 focus:outline-none focus:ring-1 focus:ring-champagne-gold/50 rounded"
      >
        Vào thẳng website &rarr;
      </button>

      {/* Main Envelope & Stationery Card Container */}
      <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
        {/* Physical Envelope Container */}
        <div
          className={`relative bg-ivory-100 rounded-sm p-6 sm:p-10 shadow-stationery-lg border border-champagne-border transition-all duration-700 ${
            isOpening ? 'shadow-2xl translate-y-3' : 'translate-y-0'
          }`}
          style={{
            backgroundImage: `radial-gradient(#E6D8C1 0.5px, transparent 0.5px)`,
            backgroundSize: '20px 20px',
          }}
        >
          {/* Double ornamental gold border */}
          <div className="border border-champagne-border p-6 sm:p-8 relative">
            {/* Corner floral ornaments */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-champagne-gold" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-champagne-gold" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-champagne-gold" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-champagne-gold" />

            {/* Inner Content */}
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
              
              {/* Stylized Intertwined Monogram (No circular frame) */}
              <div className="relative group py-1 flex items-center justify-center">
                <img
                  src="/images/monogram_gold.png"
                  alt={monogram}
                  className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-105 select-none"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1 pt-1">
                <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
                  {config.opening.title || 'WEDDING INVITATION'}
                </p>
                <div className="w-12 h-px bg-champagne-border mx-auto my-2" />
                <p className="font-cormorant text-sm italic text-ink-muted">
                  {config.opening.subtitle || 'Thiệp Mời'}
                </p>
              </div>

              {/* Couple Names (Render ONLY if configured) */}
              {hasNames && (
                <div className="py-2 space-y-1">
                  <h1 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-normal text-ink tracking-wide leading-tight">
                    {firstName}
                  </h1>
                  <span className="font-script text-xl sm:text-2xl text-champagne-gold block -my-1">
                    &amp;
                  </span>
                  <h1 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-normal text-ink tracking-wide leading-tight">
                    {secondName}
                  </h1>
                </div>
              )}

              {/* Wedding Date Display (Refined Luxury Editorial Typography) */}
              {formattedEnvelopeDate && (
                <div className="py-2.5 flex items-center justify-center gap-3">
                  <span className="w-7 sm:w-12 h-px bg-gradient-to-r from-transparent via-champagne-gold/60 to-champagne-gold/20" />
                  <span className="font-cormorant text-base sm:text-lg tracking-[0.25em] text-ink-muted/90 font-light select-none">
                    {formattedEnvelopeDate}
                  </span>
                  <span className="w-7 sm:w-12 h-px bg-gradient-to-l from-transparent via-champagne-gold/60 to-champagne-gold/20" />
                </div>
              )}

              {/* Action Button: Mở thiệp */}
              <div className="pt-4 sm:pt-6 w-full flex flex-col items-center space-y-3">
                <button
                  onClick={handleOpen}
                  disabled={isOpening}
                  className={`group relative px-8 sm:px-10 py-3 sm:py-3.5 bg-ivory-50 text-ink rounded-none border border-champagne-gold transition-all duration-300 shadow-sm hover:shadow-stationery hover:bg-champagne/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-champagne-gold/40 cursor-pointer ${
                    isOpening ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {/* Subtle corner notches */}
                  <span className="font-cormorant text-lg sm:text-xl tracking-widest uppercase font-medium flex items-center justify-center gap-2 text-ink group-hover:text-champagne-gold-dark">
                    <span>{config.opening.buttonText || 'Mở thiệp'}</span>
                    <Sparkles className="w-4 h-4 text-champagne-gold transition-transform duration-300 group-hover:rotate-12" />
                  </span>
                </button>

                {/* Sub instruction */}
                <p className="text-[11px] sm:text-xs font-sans text-ink-muted/80 tracking-wide">
                  {config.opening.helperText || 'Chạm để mở lời mời & lắng nghe điệu nhạc'}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
