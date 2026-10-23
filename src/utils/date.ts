export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isValid: boolean;
}

export function calculateTimeRemaining(dateString?: string): CountdownTime {
  if (!dateString) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false, isValid: false };
  }

  const target = new Date(dateString).getTime();
  if (isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false, isValid: false };
  }

  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isValid: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    isValid: true,
  };
}
