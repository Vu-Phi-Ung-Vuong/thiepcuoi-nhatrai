/**
 * Utility to generate and download an iCalendar (.ics) file for wedding events.
 * Runs 100% in browser without any backend.
 */

interface CalendarEventParams {
  title: string;
  description?: string;
  location?: string;
  startDateIso: string; // ISO 8601 string e.g. "2026-11-28T18:00:00+07:00"
  endDateIso?: string;
}

function formatDateToIcs(date: Date): string {
  // Format as UTC: YYYYMMDDTHHmmssZ
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function downloadIcsFile(event: CalendarEventParams): void {
  try {
    const startDate = new Date(event.startDateIso);
    if (isNaN(startDate.getTime())) {
      console.warn("Invalid start date for calendar export");
      return;
    }

    // Default duration 3 hours if no end date
    const endDate = event.endDateIso 
      ? new Date(event.endDateIso) 
      : new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

    const now = new Date();
    const uid = `${Date.now()}-wedding@invitation`;

    const cleanText = (str?: string) => 
      (str || '').replace(/\n/g, '\\n').replace(/,/g, '\\,');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luxury Ivory Wedding Invitation//VI',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatDateToIcs(now)}`,
      `DTSTART:${formatDateToIcs(startDate)}`,
      `DTEND:${formatDateToIcs(endDate)}`,
      `SUMMARY:${cleanText(event.title)}`,
      `DESCRIPTION:${cleanText(event.description || 'Trân trọng kính mời quý khách tham dự ngày chung đôi.')}`,
      `LOCATION:${cleanText(event.location || '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to generate .ics file", err);
  }
}
