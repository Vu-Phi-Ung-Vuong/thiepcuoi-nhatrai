import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface NavbarProps {
  config: WeddingConfig;
  isSampleMode: boolean;
  onToggleSampleMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, isSampleMode, onToggleSampleMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for subtle shadow & backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute available navigation items based strictly on populated sections!
  const navItems = [
    { label: 'Trang chủ', href: '#hero', exists: true },
    {
      label: 'Cặp đôi',
      href: '#couple',
      exists: Boolean(
        config.couple.groom.fullName ||
        config.couple.bride.fullName ||
        config.couple.groom.portrait ||
        config.couple.bride.portrait
      ),
    },
    {
      label: 'Đếm ngược',
      href: '#countdown',
      exists: Boolean(config.weddingDateIso),
    },
    {
      label: 'Chuyện tình yêu',
      href: '#love-story',
      exists: Boolean(config.loveStory && config.loveStory.length > 0),
    },
    {
      label: 'Album ảnh',
      href: '#gallery',
      exists: Boolean(config.gallery && config.gallery.length > 0),
    },
    {
      label: 'Sự kiện cưới',
      href: '#events',
      exists: Boolean(config.events && config.events.length > 0),
    },
    {
      label: 'Lịch trình',
      href: '#timeline',
      exists: Boolean(config.timeline && config.timeline.length > 0),
    },
    {
      label: 'Trang phục',
      href: '#dress-code',
      exists: Boolean(config.dressCode && (config.dressCode.colors?.length || config.dressCode.description)),
    },
    {
      label: 'Hỏi đáp',
      href: '#faq',
      exists: Boolean(config.faqs && config.faqs.length > 0),
    },
  ].filter((item) => item.exists);

  const monogram =
    config.couple.monogram ||
    (config.couple.groom.initial && config.couple.bride.initial
      ? `${config.couple.groom.initial} & ${config.couple.bride.initial}`
      : '✦');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory-100/95 backdrop-blur-md shadow-sm border-b border-champagne-border/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand - Tách biệt rõ ràng với chữ Trang chủ */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center shrink-0 focus:outline-none mr-8 lg:mr-10 xl:mr-14"
          aria-label="Về đầu trang"
        >
          <img
            src="/images/monogram_gold.png"
            alt={monogram}
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-x-4 xl:gap-x-6 2xl:gap-x-7 flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[11px] xl:text-xs font-sans tracking-[0.14em] xl:tracking-[0.18em] uppercase text-ink-muted hover:text-champagne-gold transition-colors duration-200 py-1 relative group whitespace-nowrap shrink-0"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-champagne-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right tools: Preview Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4 xl:ml-8">
          {/* Subtle Demo Preview Toggle button so owner can test full layout */}
          <button
            onClick={onToggleSampleMode}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans tracking-wider border transition-all ${
              isSampleMode
                ? 'bg-champagne-gold/15 text-champagne-gold-dark border-champagne-gold font-medium'
                : 'bg-ivory-50/80 text-ink-muted border-champagne-border hover:border-champagne-gold/60'
            }`}
            title="Bật/Tắt dữ liệu mẫu để xem trước toàn bộ giao diện"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
            <span>{isSampleMode ? 'Đang xem dữ liệu mẫu' : 'Xem mẫu giao diện'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            className="lg:hidden p-2 text-ink hover:text-champagne-gold transition-colors focus:outline-none focus:ring-1 focus:ring-champagne-gold"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-100/98 border-b border-champagne-border px-6 py-6 shadow-stationery-lg transition-all">
          <nav className="flex flex-col space-y-4 text-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-sans tracking-widest uppercase text-ink-muted hover:text-champagne-gold transition-colors py-1 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-champagne-border/50 flex justify-center">
              <button
                onClick={() => {
                  onToggleSampleMode();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans tracking-wider bg-champagne/50 border border-champagne-gold text-ink"
              >
                <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                <span>{isSampleMode ? 'Tắt chế độ xem mẫu' : 'Bật chế độ xem mẫu'}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
