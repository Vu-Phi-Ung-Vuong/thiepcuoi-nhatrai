import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface FallingStreamersProps {
  /** Whether the effect is active (e.g., after envelope is opened) */
  isActive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  vy: number;
  vx: number;
  width: number;
  length: number;
  color: string;
  type: 'ribbon' | 'foil' | 'sparkle';
  phase: number;
  phaseSpeed: number;
  amplitude: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
}

const LUXURY_PALETTE = [
  '#C8AE83', // Champagne Gold
  '#D4AF37', // Metallic Warm Gold
  '#E6D8C1', // Pale Gold Silk
  '#DFB89C', // Rose Champagne
  '#FAF8F5', // Warm Ivory White
  '#B89758', // Antique Gold
];

export const FallingStreamers: React.FC<FallingStreamersProps> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const animFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Initialize a single particle
  const createParticle = useCallback(
    (canvasWidth: number, canvasHeight: number, fromTop = true): Particle => {
      const typeRand = Math.random();
      const type: 'ribbon' | 'foil' | 'sparkle' =
        typeRand < 0.45 ? 'ribbon' : typeRand < 0.85 ? 'foil' : 'sparkle';

      const x = Math.random() * canvasWidth;
      const y = fromTop ? -Math.random() * 80 - 20 : Math.random() * canvasHeight;

      return {
        x,
        y,
        baseX: x,
        vy: type === 'ribbon' ? 0.9 + Math.random() * 1.1 : 0.7 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.4,
        width: type === 'ribbon' ? 3.5 + Math.random() * 2.5 : type === 'foil' ? 4 + Math.random() * 3 : 2 + Math.random() * 2,
        length: type === 'ribbon' ? 24 + Math.random() * 26 : type === 'foil' ? 10 + Math.random() * 10 : 4,
        color: LUXURY_PALETTE[Math.floor(Math.random() * LUXURY_PALETTE.length)],
        type,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.015 + Math.random() * 0.025,
        amplitude: 15 + Math.random() * 35,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: 0.02 + Math.random() * 0.04,
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: 0.01 + Math.random() * 0.02,
        opacity: 0.65 + Math.random() * 0.3,
      };
    },
    []
  );

  useEffect(() => {
    if (!isActive || !isEnabled) {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Responsive particle count: ~32 on desktop, ~18 on mobile
    const targetCount = window.innerWidth < 640 ? 18 : 32;
    particlesRef.current = Array.from({ length: targetCount }, () =>
      createParticle(width, height, false)
    );

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isDocumentVisible) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics update
        p.y += p.vy;
        p.phase += p.phaseSpeed;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;
        p.x = p.baseX + Math.sin(p.phase) * p.amplitude;

        // Reset particle if it leaves bottom or sides
        if (p.y > height + 50 || p.x < -60 || p.x > width + 60) {
          particles[i] = createParticle(width, height, true);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.type === 'ribbon') {
          // Render a sinuous, twisting serpentine ribbon strip
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.tilt) * 0.3);

          const twistScale = Math.sin(p.rotation);
          const currentWidth = Math.max(1, p.width * Math.abs(twistScale));

          // Draw curly ribbon wave segments
          ctx.beginPath();
          const segCount = 4;
          const segLen = p.length / segCount;
          ctx.moveTo(0, 0);

          for (let s = 1; s <= segCount; s++) {
            const segY = s * segLen;
            const curveX = Math.sin(p.phase + s * 1.2) * (currentWidth * 2.2);
            ctx.quadraticCurveTo(curveX, segY - segLen / 2, (s % 2 === 0 ? 1 : -1) * (currentWidth * 0.6), segY);
          }

          ctx.strokeStyle = p.color;
          ctx.lineWidth = currentWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

        } else if (p.type === 'foil') {
          // Render a fluttering rectangular gold confetti foil
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          const scaleY = Math.cos(p.tilt);

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.width, Math.abs(p.length * 0.5 * scaleY) + 1, 0, 0, Math.PI * 2);
          ctx.fill();

        } else {
          // Render a delicate 4-point gold star sparkle
          ctx.translate(p.x, p.y);
          const sparkleScale = 0.5 + Math.abs(Math.sin(p.phase * 2)) * 0.6;
          ctx.scale(sparkleScale, sparkleScale);

          ctx.fillStyle = p.color;
          ctx.beginPath();
          const r1 = p.length;
          const r2 = p.length * 0.3;
          for (let s = 0; s < 8; s++) {
            const rad = (s * Math.PI) / 4;
            const r = s % 2 === 0 ? r1 : r2;
            const px = Math.cos(rad) * r;
            const py = Math.sin(rad) * r;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isActive, isEnabled, createParticle]);

  if (!isActive) return null;

  return (
    <>
      {/* Falling Ribbon Canvas (Pointer-events-none, strictly non-blocking) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-700"
        style={{ opacity: isEnabled ? 1 : 0 }}
      />

      {/* Discrete Floating Toggle Button (Bottom-Right, above music player) */}
      <div className="fixed bottom-24 right-5 z-40 hidden sm:block">
        <button
          onClick={() => setIsEnabled((prev) => !prev)}
          title={isEnabled ? 'Tắt hiệu ứng pháo hoa dây' : 'Bật hiệu ứng pháo hoa dây'}
          aria-label={isEnabled ? 'Tắt hiệu ứng pháo hoa dây' : 'Bật hiệu ứng pháo hoa dây'}
          className={`group flex items-center gap-2 p-2.5 rounded-full border shadow-stationery transition-all duration-300 backdrop-blur-md ${
            isEnabled
              ? 'bg-ivory-100/90 text-champagne-gold border-champagne-gold/60 shadow-champagne-gold/20'
              : 'bg-white/70 text-ink-muted/60 border-champagne-border/60 hover:text-champagne-gold'
          }`}
        >
          <Sparkles
            className={`w-4 h-4 transition-transform duration-500 ${
              isEnabled ? 'rotate-12 scale-110 text-champagne-gold animate-pulse' : 'scale-95'
            }`}
          />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-sans tracking-wider uppercase transition-all duration-300 group-hover:max-w-xs group-hover:pr-1 text-ink-muted">
            {isEnabled ? 'Pháo hoa: Bật' : 'Pháo hoa: Tắt'}
          </span>
        </button>
      </div>
    </>
  );
};
