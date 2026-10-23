import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface FooterSectionProps {
  config: WeddingConfig;
  onReopenEnvelope: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ config, onReopenEnvelope }) => {
  const groomName = config.couple.groom.fullName || config.couple.groom.shortName;
  const brideName = config.couple.bride.fullName || config.couple.bride.shortName;
  const hasNames = Boolean(groomName && brideName);
  const isBrideFirst =
    config.partyType === 'nhagai' ||
    Boolean(config.events?.[0]?.title?.toLowerCase().includes('vu quy'));
  const weddingDateDisplay = config.weddingDateDisplay;

  const monogram =
    config.couple.monogram ||
    (config.couple.groom.initial && config.couple.bride.initial
      ? `${config.couple.groom.initial} & ${config.couple.bride.initial}`
      : 'Đ & T');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Lời cảm ơn và kết thúc thiệp cưới"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-ivory-100 relative overflow-hidden border-t border-champagne-border/60"
    >
      {/* Background paper texture */}
      <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8 sm:space-y-10">
        
        {/* Stylized Intertwined Monogram (No circular frame) */}
        <div className="flex items-center justify-center mx-auto transition-transform duration-500 hover:scale-105">
          <img
            src="/images/monogram_gold.png"
            alt={monogram}
            className="w-20 sm:w-24 h-auto object-contain filter drop-shadow-sm select-none"
          />
        </div>

        {/* Thank You Note */}
        <div className="space-y-3 px-4">
          <h2 className="font-cormorant text-2xl sm:text-4xl lg:text-5xl font-light text-ink tracking-wide leading-tight">
            {config.footer.heading || 'Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.'}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light max-w-lg mx-auto">
            {config.footer.message || 'Rất mong được gặp bạn trong ngày vui sắp tới.'}
          </p>
        </div>

        {/* Concluding Romantic Photo: snug w-fit */}
        {config.footer.photo && (
          <div className="relative w-fit max-w-[90vw] mx-auto my-3 p-2.5 sm:p-3 bg-white shadow-stationery-lg border border-champagne-border/90">
            <div className="relative overflow-hidden bg-ivory-200">
              <img
                src={config.footer.photo}
                alt={hasNames ? `Ảnh cưới cảm ơn của ${groomName} và ${brideName}` : 'Ảnh cưới cảm ơn'}
                className="max-h-[50vh] sm:max-h-[58vh] w-auto h-auto max-w-[80vw] sm:max-w-sm object-contain block mx-auto hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-3 sm:inset-4 border border-white/40 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Couple Signature (Render only if configured) */}
        {hasNames && (
          <div className="py-2 space-y-1">
            <p className="font-cormorant text-2xl sm:text-3xl font-normal text-ink tracking-wider">
              {isBrideFirst ? `${brideName} & ${groomName}` : `${groomName} & ${brideName}`}
            </p>
            {weddingDateDisplay && (
              <p className="text-xs font-sans tracking-widest text-champagne-gold font-medium uppercase">
                {weddingDateDisplay}
              </p>
            )}
            {config.footer.closingQuote && (
              <p className="font-script text-xl sm:text-2xl text-champagne-gold-dark pt-1">
                {config.footer.closingQuote}
              </p>
            )}
          </div>
        )}

        {/* Decorative Divider */}
        <div className="w-24 h-px gold-divider mx-auto" />

        {/* Re-open envelope & Scroll-to-top actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans tracking-widest uppercase text-ink-muted hover:text-champagne-gold border border-champagne-border/80 bg-white/60 hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Mở lại phong bì</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans tracking-widest uppercase text-ink-muted hover:text-champagne-gold border border-champagne-border/80 bg-white/60 hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Về đầu trang</span>
          </button>
        </div>

        {/* Small copyright / studio sign-off */}
        <div className="pt-8">
          <p className="text-[10px] font-sans text-ink-faint tracking-widest uppercase">
            Vũ Thành Đạt &amp; Xuân Thuỳ &bull; Wedding Invitation
          </p>
        </div>

      </div>
    </footer>
  );
};
