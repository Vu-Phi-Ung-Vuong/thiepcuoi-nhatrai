import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface GallerySectionProps {
  config: WeddingConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ config }) => {
  const images = config.gallery;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation & body scroll locking for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeIndex === null || !images) return;
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      }
    },
    [activeIndex, images]
  );

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handleKeyDown]);

  if (!images || images.length === 0) {
    return null;
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images && activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images && activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section
      id="gallery"
      aria-label="Khoảnh khắc hạnh phúc"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-ivory-100 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            MOMENTS
          </p>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ink tracking-wide">
            Khoảnh Khắc Hạnh Phúc
          </h2>
          <div className="w-16 h-px gold-divider mx-auto pt-1" />
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {images.map((img, idx) => {
            const isWide = img.aspectRatio === 'landscape';

            return (
              <div
                key={img.id || idx}
                onClick={() => setActiveIndex(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Xem ảnh lớn: ${img.title || 'Khoảnh khắc cưới'}`}
                className={`group relative overflow-hidden bg-white p-2.5 sm:p-3 border border-champagne-border/80 shadow-stationery cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-stationery-lg ${
                  isWide ? 'sm:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-ivory-200 ${
                    img.aspectRatio === 'landscape'
                      ? 'aspect-[16/10]'
                      : img.aspectRatio === 'square'
                      ? 'aspect-square'
                      : 'aspect-[2/3]'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title || `Ảnh cưới ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      objectPosition: img.aspectRatio === 'landscape' ? 'center' : 'top center',
                    }}
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-ivory-100/90 text-champagne-gold flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {img.title && (
                  <p className="text-[12px] font-cormorant italic text-ink-muted text-center pt-2">
                    {img.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && images[activeIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIndex(null)}
            aria-label="Đóng ảnh phóng to"
            className="absolute top-5 right-5 text-ivory-100 hover:text-champagne-gold p-2 z-50 focus:outline-none"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Previous button */}
          <button
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-ivory-100 hover:text-champagne-gold transition-colors z-50 focus:outline-none"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Active Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2 bg-white/5 border border-white/10 rounded-sm"
          >
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].title || 'Phóng to ảnh cưới'}
              className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl"
            />
            {images[activeIndex].title && (
              <p className="text-sm font-cormorant italic text-ivory-100/90 text-center mt-3 tracking-wide">
                {images[activeIndex].title}
              </p>
            )}
            <p className="text-[11px] font-sans text-ivory-100/60 tracking-widest mt-1">
              {activeIndex + 1} / {images.length}
            </p>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            aria-label="Ảnh kế tiếp"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-ivory-100 hover:text-champagne-gold transition-colors z-50 focus:outline-none"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
};
