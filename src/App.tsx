import React, { useState, useMemo } from 'react';
import { weddingConfig, sampleWeddingData } from './data/weddingConfig';
import type { WeddingConfig } from './types/wedding';
import { AudioProvider } from './context/AudioContext';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { TimelineSection } from './components/TimelineSection';
import { DressCodeSection } from './components/DressCodeSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { FloatingMusicToggle } from './components/FloatingMusicToggle';
import { FallingStreamers } from './components/FallingStreamers';

export const App: React.FC = () => {
  // Check if envelope has been opened in current session
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(() => {
    return sessionStorage.getItem('wedding_envelope_opened') === 'true';
  });

  // State to toggle between actual config and rich sample preview
  const [isSampleMode, setIsSampleMode] = useState<boolean>(false);

  // Active configuration depending on preview mode
  const activeConfig: WeddingConfig = useMemo(() => {
    if (!isSampleMode) {
      return weddingConfig;
    }
    // Deeply merge with sample wedding data for rich preview
    return {
      ...weddingConfig,
      ...sampleWeddingData,
      couple: {
        ...weddingConfig.couple,
        ...sampleWeddingData.couple,
        groom: {
          ...weddingConfig.couple.groom,
          ...sampleWeddingData.couple?.groom,
          family: {
            ...weddingConfig.couple.groom.family,
            ...sampleWeddingData.couple?.groom?.family,
          },
        },
        bride: {
          ...weddingConfig.couple.bride,
          ...sampleWeddingData.couple?.bride,
          family: {
            ...weddingConfig.couple.bride.family,
            ...sampleWeddingData.couple?.bride?.family,
          },
        },
      },
      hero: {
        ...weddingConfig.hero,
        ...sampleWeddingData.hero,
      },
      events: sampleWeddingData.events || weddingConfig.events,
      loveStory: sampleWeddingData.loveStory || weddingConfig.loveStory,
      gallery: sampleWeddingData.gallery || weddingConfig.gallery,
      timeline: sampleWeddingData.timeline || weddingConfig.timeline,
      dressCode: sampleWeddingData.dressCode || weddingConfig.dressCode,
      faqs: sampleWeddingData.faqs || weddingConfig.faqs,
    };
  }, [isSampleMode]);

  const handleEnvelopeComplete = () => {
    setEnvelopeOpened(true);
    sessionStorage.setItem('wedding_envelope_opened', 'true');
  };

  const handleReopenEnvelope = () => {
    setEnvelopeOpened(false);
    sessionStorage.removeItem('wedding_envelope_opened');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AudioProvider
      audioSrc={activeConfig.audio.src}
      trackTitle={activeConfig.audio.trackTitle}
      artist={activeConfig.audio.artist}
      initialVolume={activeConfig.audio.initialVolume}
      fadeInDurationMs={activeConfig.audio.fadeInDurationMs}
    >
      <div className="min-h-screen bg-ivory-100 text-ink selection:bg-champagne-gold/25 selection:text-ink relative flex flex-col font-sans">
        
        {/* 1. Physical Opening Envelope Modal */}
        {!envelopeOpened && (
          <OpeningEnvelope
            config={activeConfig}
            onOpenComplete={handleEnvelopeComplete}
          />
        )}

        {/* Continuous Luxury Ribbon Streamers Effect (Pháo hoa dây rơi lượn sóng) */}
        <FallingStreamers isActive={envelopeOpened} />

        {/* 2. Top Navigation Bar */}
        <Navbar
          config={activeConfig}
          isSampleMode={isSampleMode}
          onToggleSampleMode={() => setIsSampleMode((prev) => !prev)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 3. Hero Section */}
          <HeroSection config={activeConfig} />

          {/* 4. Couple Introduction & Family */}
          <CoupleSection config={activeConfig} />

          {/* 5. Live Countdown */}
          <CountdownSection config={activeConfig} />

          {/* 6. Love Story */}
          <LoveStorySection config={activeConfig} />

          {/* 7. Gallery & Lightbox */}
          <GallerySection config={activeConfig} />

          {/* 8. Event Details */}
          <EventsSection config={activeConfig} />

          {/* 9. Day Timeline */}
          <TimelineSection config={activeConfig} />

          {/* 10. Dress Code */}
          <DressCodeSection config={activeConfig} />

          {/* 11. FAQ */}
          <FaqSection config={activeConfig} />
        </main>

        {/* 12. Concluding Section & Footer */}
        <FooterSection
          config={activeConfig}
          onReopenEnvelope={handleReopenEnvelope}
        />

        {/* 13. Fixed Floating Music Toggle (Right Side) */}
        <FloatingMusicToggle />

      </div>
    </AudioProvider>
  );
};

export default App;
