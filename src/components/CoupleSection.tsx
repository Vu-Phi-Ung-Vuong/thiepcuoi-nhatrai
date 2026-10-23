import React from 'react';
import type { WeddingConfig } from '../types/wedding';

interface CoupleSectionProps {
  config: WeddingConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config }) => {
  const { groom, bride } = config.couple;

  // Determine priority: Bride first for Nha Gai / Le Vu Quy, Groom first for Nha Trai / Le Thanh Hon
  const isBrideFirst =
    config.partyType === 'nhagai' ||
    Boolean(config.events?.[0]?.title?.toLowerCase().includes('vu quy'));

  // Verify if any groom or bride info exists
  const hasGroomInfo = Boolean(groom.fullName || groom.portrait || groom.bio || groom.family?.fatherName);
  const hasBrideInfo = Boolean(bride.fullName || bride.portrait || bride.bio || bride.family?.fatherName);

  if (!hasGroomInfo && !hasBrideInfo) {
    return null; // Omit section completely if no data
  }

  const renderGroomCard = () => {
    if (!hasGroomInfo) return null;
    return (
      <div className="flex flex-col items-center text-center space-y-5 p-6 sm:p-8 bg-ivory-100/70 border border-champagne-border/80 shadow-stationery">
        {/* Groom Portrait */}
        {groom.portrait && (
          <div className="relative w-48 sm:w-60 aspect-[4/5] overflow-hidden border border-champagne-border shadow-md bg-ivory-200">
            <img
              src={groom.portrait}
              alt={groom.fullName || 'Chú rể'}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-2 border border-white/40 pointer-events-none" />
          </div>
        )}

        {/* Groom Titles & Name */}
        <div className="space-y-1">
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne-gold font-medium">
            {groom.title || 'CHÚ RỂ'}
          </span>
          {groom.fullName && (
            <h3 className="font-cormorant text-2xl sm:text-3xl text-ink font-normal tracking-wide">
              {groom.fullName}
            </h3>
          )}
          {groom.bio && (
            <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light pt-2 max-w-sm">
              {groom.bio}
            </p>
          )}
        </div>

        {/* Groom Family Details (Only if provided) */}
        {groom.family && (groom.family.fatherName || groom.family.motherName) && (
          <div className="pt-4 border-t border-champagne-border/60 w-full max-w-xs space-y-1">
            <p className="text-[10px] font-sans tracking-widest uppercase text-champagne-gold font-medium">
              {groom.family.parentsTitle || 'Gia Đình Nhà Trai'}
            </p>
            {groom.family.fatherName && (
              <p className="text-xs sm:text-sm text-ink font-light">
                Ông: <span className="font-medium">{groom.family.fatherName}</span>
              </p>
            )}
            {groom.family.motherName && (
              <p className="text-xs sm:text-sm text-ink font-light">
                Bà: <span className="font-medium">{groom.family.motherName}</span>
              </p>
            )}
            {groom.family.note && (
              <p className="text-[11px] font-sans text-ink-muted italic pt-0.5">
                ({groom.family.note})
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderBrideCard = () => {
    if (!hasBrideInfo) return null;
    return (
      <div className="flex flex-col items-center text-center space-y-5 p-6 sm:p-8 bg-ivory-100/70 border border-champagne-border/80 shadow-stationery">
        {/* Bride Portrait */}
        {bride.portrait && (
          <div className="relative w-48 sm:w-60 aspect-[4/5] overflow-hidden border border-champagne-border shadow-md bg-ivory-200">
            <img
              src={bride.portrait}
              alt={bride.fullName || 'Cô dâu'}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-2 border border-white/40 pointer-events-none" />
          </div>
        )}

        {/* Bride Titles & Name */}
        <div className="space-y-1">
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne-gold font-medium">
            {bride.title || 'CÔ DÂU'}
          </span>
          {bride.fullName && (
            <h3 className="font-cormorant text-2xl sm:text-3xl text-ink font-normal tracking-wide">
              {bride.fullName}
            </h3>
          )}
          {bride.bio && (
            <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light pt-2 max-w-sm">
              {bride.bio}
            </p>
          )}
        </div>

        {/* Bride Family Details (Only if provided) */}
        {bride.family && (bride.family.fatherName || bride.family.motherName) && (
          <div className="pt-4 border-t border-champagne-border/60 w-full max-w-xs space-y-1">
            <p className="text-[10px] font-sans tracking-widest uppercase text-champagne-gold font-medium">
              {bride.family.parentsTitle || 'Gia Đình Nhà Gái'}
            </p>
            {bride.family.fatherName && (
              <p className="text-xs sm:text-sm text-ink font-light">
                Ông: <span className="font-medium">{bride.family.fatherName}</span>
              </p>
            )}
            {bride.family.motherName && (
              <p className="text-xs sm:text-sm text-ink font-light">
                Bà: <span className="font-medium">{bride.family.motherName}</span>
              </p>
            )}
            {bride.family.note && (
              <p className="text-[11px] font-sans text-ink-muted italic pt-0.5">
                ({bride.family.note})
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="couple"
      aria-label="Giới thiệu cô dâu và chú rể"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            GIỚI THIỆU
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            {isBrideFirst ? 'Cô Dâu & Chú Rể' : 'Chú Rể & Cô Dâu'}
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start relative">
          
          {/* Central Monogram Connector (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center transition-transform duration-500 hover:scale-110">
            <img
              src="/images/monogram_gold.png"
              alt="Monogram Đ & T"
              className="w-14 sm:w-16 h-auto object-contain filter drop-shadow-sm select-none"
            />
          </div>

          {/* Render in appropriate order according to tradition */}
          {isBrideFirst ? (
            <>
              {renderBrideCard()}
              {renderGroomCard()}
            </>
          ) : (
            <>
              {renderGroomCard()}
              {renderBrideCard()}
            </>
          )}

        </div>

        {/* Vietnamese Traditional Wedding Greeting Note (Optional) */}
        {config.traditionNote?.content && (
          <div className="mt-14 max-w-xl mx-auto text-center p-6 bg-ivory-50 border border-champagne-border/60">
            {config.traditionNote.title && (
              <h4 className="font-cormorant text-lg text-ink font-medium tracking-wide mb-2">
                {config.traditionNote.title}
              </h4>
            )}
            <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              {config.traditionNote.content}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
