export interface FamilySide {
  parentsTitle?: string; // e.g. "Nhà Trai", "Nhà Gái"
  fatherName?: string;
  motherName?: string;
  note?: string; // e.g. "Trưởng nam", "Út nữ"
}

export interface CoupleProfile {
  groom: {
    fullName?: string;
    shortName?: string;
    initial?: string;
    title?: string; // e.g. "Chú rể"
    portrait?: string;
    bio?: string;
    family?: FamilySide;
  };
  bride: {
    fullName?: string;
    shortName?: string;
    initial?: string;
    title?: string; // e.g. "Cô dâu"
    portrait?: string;
    bio?: string;
    family?: FamilySide;
  };
  monogram?: string; // e.g. "Q & T" or "QT"
  hashtag?: string; // e.g. "#QuangTrang2026"
}

export interface LoveStoryMilestone {
  id: string;
  yearOrDate?: string;
  title: string;
  story: string;
  photo?: string;
  photoCaption?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail?: string;
  title?: string;
  caption?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface WeddingEvent {
  id: string;
  title: string; // e.g. "Lễ Thành Hôn", "Lễ Vu Quy", "Tiệc Cưới"
  subtitle?: string; // e.g. "Hôn Lễ Trang Trọng"
  date?: string; // YYYY-MM-DD
  timeDisplay?: string; // e.g. "11:00 AM"
  startTimeIso?: string; // ISO 8601 string for calendar e.g. "2026-11-28T11:00:00"
  endTimeIso?: string; // ISO 8601 string e.g. "2026-11-28T14:00:00"
  venueName?: string;
  address?: string;
  note?: string; // e.g. "Sự hiện diện của quý khách là niềm vinh hạnh..."
  dressCode?: string;
  mapUrl?: string; // Google Maps URL
  image?: string;
}

export interface DayTimelineItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  iconName?: 'sparkles' | 'users' | 'heart' | 'camera' | 'wine' | 'music';
}

export interface DressCodeColor {
  name: string;
  hex: string;
  border?: boolean;
}

export interface DressCodeConfig {
  title?: string;
  description?: string;
  colors?: DressCodeColor[];
  referenceImages?: string[];
  note?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface WeddingConfig {
  // Party Side ('nhagai': Bride's family, 'nhatrai': Groom's family)
  partyType?: 'nhagai' | 'nhatrai';

  // Metadata & SEO
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };

  // Audio configuration
  audio: {
    src: string; // project-relative path or URL e.g. "/audio/wedding-music.mp3"
    trackTitle?: string;
    artist?: string;
    initialVolume?: number; // 0.0 - 1.0 (default 0.7)
    fadeInDurationMs?: number;
  };

  // Couple details
  couple: CoupleProfile;

  // Key Dates & Countdown
  weddingDateIso?: string; // ISO 8601 e.g. "2026-11-28T11:00:00+07:00"
  weddingDateDisplay?: string; // Formatted date e.g. "28 . 11 . 2026"
  timezone?: string; // Default "Asia/Ho_Chi_Minh"
  countdownSubtext?: string;

  // Opening Envelope Card
  opening: {
    title?: string; // "WEDDING INVITATION" or "THIỆP MỜI"
    subtitle?: string; // "Trân trọng kính mời"
    dateDisplay?: string; // Tùy chọn hiển thị ngày riêng trên thiệp mời ban đầu
    buttonText?: string; // "Mở thiệp"
    helperText?: string; // "Chạm để mở lời mời"
    envelopeSealInitial?: string;
  };

  // Hero Section
  hero: {
    heroImage?: string;
    greeting?: string; // "TRÂN TRỌNG KÍNH MỜI"
    invitationQuote?: string; // "Cùng nhau viết tiếp câu chuyện tình yêu."
    subQuote?: string; // "Chúng mình hạnh phúc khi được chia sẻ ngày đặc biệt này cùng những người thân yêu."
    saveTheDateButtonText?: string;
  };

  // Traditional family greeting & Vietnamese ceremony note
  traditionNote?: {
    title?: string;
    content?: string;
  };

  // Optional Sections
  loveStory?: LoveStoryMilestone[];
  gallery?: GalleryImage[];
  events?: WeddingEvent[];
  timeline?: DayTimelineItem[];
  dressCode?: DressCodeConfig;
  faqs?: FaqItem[];

  // Footer / Concluding Section
  footer: {
    heading?: string; // "Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình."
    message?: string; // "Rất mong được gặp bạn trong ngày vui sắp tới."
    closingQuote?: string;
    photo?: string;
  };
}
