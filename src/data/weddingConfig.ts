import type { WeddingConfig } from '../types/wedding';

/**
 * =========================================================================
 * BẢNG ĐIỀU KHIỂN NỘI DUNG ĐÁM CƯỚI (CENTRAL WEDDING CONFIGURATION)
 * PHIÊN BẢN NHÀ TRAI - LỄ THÀNH HÔN
 * =========================================================================
 * 
 * Thông tin chính thức của Cặp đôi:
 * Chú Rể: Vũ Thành Đạt & Cô Dâu: Xuân Thuỳ
 */

export const weddingConfig: WeddingConfig = {
  // Định danh phiên bản: Nhà Trai (Lễ Thành Hôn - Tên Chú Rể đứng trước)
  partyType: "nhatrai",

  // 1. CẤU HÌNH TIÊU ĐỀ & CHIA SẺ MẠNG XÃ HỘI (SEO & SOCIAL SHARE)
  meta: {
    title: "Thành Đạt & Xuân Thuỳ | Lễ Thành Hôn",
    description: "Gia đình Nhà Trai trân trọng kính mời quý khách tham dự Lễ Thành Hôn của Thành Đạt & Xuân Thuỳ.",
    ogImage: "/images/BIADatThuy_5920.jpg",
  },

  // 2. NHẠC NỀN CHÍNH THỨC (BACKGROUND MUSIC)
  audio: {
    src: "/audio/wedding-music.mp3",
    trackTitle: "I Do",
    artist: "911 / Wedding Acoustic Edition",
    initialVolume: 0.75,
    fadeInDurationMs: 1500,
  },

  // 3. THÔNG TIN CẶP ĐÔI (COUPLE INFORMATION)
  couple: {
    groom: {
      fullName: "Thành Đạt",
      shortName: "Thành Đạt",
      initial: "Đ",
      title: "Chú Rể",
      portrait: "/images/groom_portrait.jpg",
      bio: "Anh tìm thấy ở em một sự bình yên dịu dàng nhất, người mà anh muốn cùng đi qua mọi thăng trầm của cuộc đời.",
      family: {
        parentsTitle: "Nhà Trai",
        fatherName: "Vũ Vĩnh Phú",
        motherName: "Trịnh Thị Nguyệt",
        note: "Trưởng nam",
      },
    },
    bride: {
      fullName: "Xuân Thuỳ",
      shortName: "Xuân Thuỳ",
      initial: "T",
      title: "Cô Dâu",
      portrait: "/images/bride_portrait.jpg",
      bio: "Cảm ơn anh vì đã luôn kiên nhẫn, yêu thương và biến những ước mơ giản đơn của em thành hiện thực.",
      family: {
        parentsTitle: "Nhà Gái",
        fatherName: "Nguyễn Minh Trí",
        motherName: "Nguyễn Thị Xuân Hải",
        note: "Trưởng nữ",
      },
    },
    monogram: "Đ & T",
    hashtag: "#DatThuyWedding",
  },

  // 4. NGÀY CƯỚI CHÍNH & ĐỒNG HỒ ĐẾM NGƯỢC (WEDDING DATE & COUNTDOWN)
  weddingDateIso: "2026-12-12T11:30:00+07:00",
  weddingDateDisplay: "12 . 12 . 2026 (Nhằm 04-11 năm Bính Ngọ)",
  timezone: "Asia/Ho_Chi_Minh",
  countdownSubtext: "Chúng mình đang háo hức chờ đón ngày đặc biệt này.",

  // 5. TRẢI NGHIỆM MỞ THIỆP ĐẦU TIÊN (ENVELOPE OPENING EXPERIENCE)
  opening: {
    title: "WEDDING INVITATION",
    subtitle: "LỄ THÀNH HÔN",
    dateDisplay: "12-12-2026",
    buttonText: "Mở thiệp",
    helperText: "Chạm để mở lời mời & lắng nghe điệu nhạc",
    envelopeSealInitial: "Đ & T",
  },

  // 6. KHỐI HERO (ĐẦU TRANG SAU KHI MỞ THIỆP)
  hero: {
    heroImage: "/images/BIADatThuy_5920.jpg",
    greeting: "TRÂN TRỌNG KÍNH MỜI",
    invitationQuote: "Cùng nhau viết tiếp câu chuyện tình yêu.",
    subQuote: "Chúng mình hạnh phúc khi được chia sẻ ngày đặc biệt này cùng những người thân yêu.",
    saveTheDateButtonText: "Lưu ngày cưới",
  },

  // 7. LỜI CHÚC TRUYỀN THỐNG / GIA ĐÌNH HAI BÊN
  traditionNote: {
    title: "Gia Đình & Lễ Nghi Truyền Thống",
    content: "Được sự đồng thuận và chúc phúc từ hai bên gia đình, hôn lễ sẽ được cử hành trang trọng theo phong tục cổ truyền dân tộc và tiệc cưới hiện đại.",
  },

  // 8. CÂU CHUYỆN TÌNH YÊU (OUR LOVE STORY)
  loveStory: [
    {
      id: "s1",
      yearOrDate: "Khởi Đầu",
      title: "Khoảnh khắc tìm thấy nhau",
      story: "Từ những ngày đầu gặp gỡ với bao bỡ ngỡ, chúng mình nhận ra ở đối phương sự đồng điệu kỳ diệu của hai tâm hồn.",
      photo: "/images/DatThuy_7335.jpg",
    },
    {
      id: "s2",
      yearOrDate: "Đồng Hành",
      title: "Những chặng đường sẻ chia",
      story: "Cùng nhau đi qua những nốt thăng trầm, từng chuyến đi và từng kỷ niệm giản đơn đều trở thành sợi dây gắn kết bền chặt.",
      photo: "/images/DatThuy_7432.jpg",
    },
    {
      id: "s3",
      yearOrDate: "Gắn Kết",
      title: "Lời hẹn ước chung đôi",
      story: "Khi nhận ra mình muốn nhìn thấy nụ cười của nhau mỗi sớm mai thức dậy, chúng mình quyết định cùng nhau xây dựng tổ ấm trọn đời.",
      photo: "/images/DatThuy_7185.jpg",
    },
  ],

  // 9. ALBUM ẢNH CƯỚI NGHỆ THUẬT (PHOTO GALLERY - 11 ẢNH ĐƯỢC CHIA THÀNH 4 HÀNG CÂN ĐỐI)
  gallery: [
    // HÀNG 1: 1 ảnh đứng + 1 ảnh ngang trải rộng (tổng 3 cột)
    {
      id: "g1",
      src: "/images/BIADatThuy_5920.jpg",
      title: "Ánh nhìn hạnh phúc",
      aspectRatio: "portrait",
    },
    {
      id: "g2",
      src: "/images/BDatThuy_7308.jpg",
      title: "Tựa vào vai anh",
      aspectRatio: "landscape",
    },

    // HÀNG 2: 3 ảnh đứng cùng tông màu kem / studio (tổng 3 cột)
    {
      id: "g3",
      src: "/images/BDatThuy_5896.jpg",
      title: "Chạm nhẹ yêu thương",
      aspectRatio: "portrait",
    },
    {
      id: "g4",
      src: "/images/DatThuy_5884.jpg",
      title: "Điệu nhảy ngày chung đôi",
      aspectRatio: "portrait",
    },
    {
      id: "g5",
      src: "/images/DatThuy_7035.jpg",
      title: "Dịu dàng chăm chút",
      aspectRatio: "portrait",
    },

    // HÀNG 3: 3 ảnh đứng cùng tông màu sáng / kem / ivory (bổ sung đủ 3 cột trọn vẹn)
    {
      id: "g6",
      src: "/images/DatThuy_5966.jpg",
      title: "Nụ cười rạng rỡ",
      aspectRatio: "portrait",
    },
    {
      id: "g7",
      src: "/images/ACDatThuy_5910.jpg",
      title: "Nắm tay hẹn ước",
      aspectRatio: "portrait",
    },
    {
      id: "g8",
      src: "/images/DatThuy_7296.jpg",
      title: "Cùng nhau sánh bước",
      aspectRatio: "portrait",
    },

    // HÀNG 4: TOÀN BỘ 3 ẢNH MÀU ĐỎ TRUYỀN THỐNG ĐƯA XUỐNG HÀNG NÀY ĐẦY ĐỦ 3 CỘT
    {
      id: "g9",
      src: "/images/DatThuy_7569.jpg",
      title: "Nét duyên Áo Dài truyền thống",
      aspectRatio: "portrait",
    },
    {
      id: "g10",
      src: "/images/DatThuy_7685.jpg",
      title: "Song Hỷ lâm môn",
      aspectRatio: "portrait",
    },
    {
      id: "g11",
      src: "/images/DatThuy_7720.jpg",
      title: "Bên nhau trọn đời",
      aspectRatio: "portrait",
    },
  ],

  // 10. THÔNG TIN SỰ KIỆN & TIỆC CƯỚI (WEDDING EVENTS)
  events: [
    {
      id: "event-tieccuoi",
      title: "Lễ Thành Hôn",
      subtitle: "Trung Tâm Hội Nghị Tiệc Cưới DIAMOND PLACE",
      date: "12-12-2026 (Nhằm 04-11 năm Bính Ngọ)",
      timeDisplay: "11:30 Sáng",
      startTimeIso: "2026-12-12T11:30:00+07:00",
      endTimeIso: "2026-12-12T14:30:00+07:00",
      venueName: "DIAMOND PLACE - Sảnh Sapphire",
      address: "15A Hồ Văn Huê, Phường Đức Nhuận, TP.HCM (Quận Phú Nhuận cũ)",
      note: "Sự hiện diện của quý khách là niềm vinh hạnh lớn nhất cho gia đình Nhà Trai chúng mình.",
      dressCode: "Trắng Ivory, Be Nhạt, Vàng Champagne, Đen Lịch Sự",
      mapUrl: "https://maps.app.goo.gl/dqcGupqv2gX6qZLL9",
    },
  ],

  // 11. LỊCH TRÌNH NGÀY CƯỚI (DAY TIMELINE)
  timeline: [
    { id: "tl-1", time: "11:30", title: "Đón khách & Chụp ảnh lưu niệm", description: "Chào đón quan khách, chụp ảnh kỷ niệm tại khu vực backdrop", iconName: "camera" },
    { id: "tl-2", time: "11:45", title: "Nghi thức Hôn lễ", description: "Thành Đạt & Xuân Thuỳ bước vào lễ đường, trao nhẫn và cắt bánh cưới", iconName: "heart" },
    { id: "tl-3", time: "12:00", title: "Khai tiệc mừng", description: "Thưởng thức ẩm thực tinh hoa trong không gian âm nhạc ấm cúng", iconName: "wine" },
    { id: "tl-4", time: "12:10", title: "Giao lưu & Âm nhạc", description: "Trò chuyện, chúc mừng và những điệu nhạc ngọt ngào", iconName: "sparkles" },
  ],

  // 12. QUY ĐỊNH TRANG PHỤC (DRESS CODE)
  dressCode: {
    title: "Trang Phục Gợi Ý",
    description: "Chúng mình rất vui khi được đón bạn trong diện mạo thật rạng rỡ. Để có những bức ảnh kỷ niệm hài hòa, quý khách có thể ưu tiên các tông màu trang nhã bên dưới:",
    colors: [
      { name: "Trắng Ivory", hex: "#FAF8F5", border: true },
      { name: "Champagne", hex: "#E8DCBE" },
      { name: "Be ấm", hex: "#D6C7B2" },
      { name: "Vàng Gold nhẹ", hex: "#C8AE83" },
      { name: "Đen Lịch Lãm", hex: "#302B27" },
    ],
    note: "Khuyến khích trang phục lịch sự, sang trọng (Smart Casual / Formal).",
  },

  // 13. CÂU HỎI THƯỜNG GẶP (FAQ)
  faqs: [
    {
      id: "faq-1",
      question: "Lễ cưới diễn ra vào ngày nào và mấy giờ?",
      answer: "Tiệc cưới Lễ Thành Hôn mừng ngày chung đôi của Thành Đạt & Xuân Thuỳ sẽ diễn ra vào lúc 11:30 trưa Thứ Bảy, ngày 12 tháng 12 năm 2026 (nhằm ngày 04 tháng 11 năm Bính Ngọ) tại Sảnh Sapphire, DIAMOND PLACE (15A Hồ Văn Huê, Phú Nhuận).",
    },
    {
      id: "faq-2",
      question: "Tôi có thể xem đường đi đến địa điểm như thế nào?",
      answer: "Bạn chỉ cần nhấn vào nút 'Chỉ đường' ở mục Thông Tin Buổi Lễ, Google Maps sẽ tự động chỉ dẫn tuyến đường thuận tiện nhất đến DIAMOND PLACE.",
    },
    {
      id: "faq-3",
      question: "Có chỗ đỗ xe tại địa điểm tổ chức không?",
      answer: "DIAMOND PLACE có khu vực giữ xe ô tô và xe máy rộng rãi với đội ngũ nhân viên an ninh hướng dẫn tận tình, hoàn toàn miễn phí cho khách dự tiệc.",
    },
  ],

  // 14. PHẦN KẾT & CHÂN TRANG (FINAL CLOSING & FOOTER)
  footer: {
    heading: "Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.",
    message: "Rất mong được đón tiếp và chung vui cùng bạn trong ngày trọng đại sắp tới.",
    closingQuote: "With love & gratitude • Thành Đạt & Xuân Thuỳ",
    photo: "/images/DatThuy_7522.jpg",
  },
};

export const sampleWeddingData: Partial<WeddingConfig> = weddingConfig;
