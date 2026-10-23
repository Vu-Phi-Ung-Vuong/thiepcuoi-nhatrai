# HƯỚNG DẪN QUẢN TRỊ & CẬP NHẬT THIỆP CƯỚI TRỰC TUYẾN
## LUXURY IVORY & CHAMPAGNE GOLD WEDDING INVITATION WEBSITE

Chào mừng bạn đến với trang web thiệp cưới cao cấp phong cách Ivory & Champagne Gold. Website được thiết kế theo chuẩn ấn phẩm thiệp cưới cao cấp kết hợp tạp chí ảnh cưới nghệ thuật (Editorial Wedding Photography), hoàn toàn chạy tĩnh (Frontend) và không cần cơ sở dữ liệu.

Mọi nội dung trên website đều có thể chỉnh sửa dễ dàng tại **MỘT FILE DUY NHẤT**:
📁 `src/data/weddingConfig.ts`

---

## 1. NGUYÊN TẮC HOẠT ĐỘNG THÔNG MINH (TỰ ĐỘNG ẨN THÔNG TIN CHƯA CÓ)

- **Không bao giờ hiển thị chữ thừa**: Nếu bạn chưa điền tên, chưa có ngày cưới hoặc chưa có ảnh, hệ thống sẽ **tự động ẩn** mục đó đi một cách duyên dáng. Tuyệt đối không xuất hiện các ký tự rỗng như `[TÊN CHÚ RỂ]`, `null` hay ngoặc vuông trên trang.
- **Thanh điều hướng tự thích ứng**: Menu trên đầu trang chỉ hiển thị các mục mà bạn đã nhập nội dung.
- **Chế độ xem trước (Preview Mode)**: Ngay trên thanh menu có nút **"Xem mẫu giao diện"** để bạn bật/tắt xem thử toàn bộ hình ảnh và sự kiện mẫu trước khi nhập dữ liệu thật.

---

## 2. HƯỚNG DẪN CẬP NHẬT TỪNG MỤC CỤ THỂ

Mở file `src/data/weddingConfig.ts` bằng bất kỳ trình soạn thảo văn bản nào (VSCode, Notepad, Sublime Text...):

### 2.1. Đổi tên Cô Dâu & Chú Rể
Tìm đến phần `couple:` trong file:
```ts
couple: {
  groom: {
    fullName: "Nguyễn Minh Quang", // Điền họ và tên chú rể
    shortName: "Minh Quang",        // Tên thân mật
    initial: "Q",                   // Chữ cái đầu
    title: "Chú Rể",
    portrait: "/images/groom.jpg",  // Ảnh chân dung (hoặc để trống "")
    bio: "Lời tâm sự của chú rể...",
    family: {
      parentsTitle: "Nhà Trai",
      fatherName: "Nguyễn Văn Hùng", // Tên Bố (để trống nếu không dùng)
      motherName: "Trần Thị Mai",    // Tên Mẹ (để trống nếu không dùng)
      note: "Trưởng nam",           // Thứ bậc (để trống nếu không dùng)
    },
  },
  bride: {
    fullName: "Lê Thu Trang",       // Điền họ và tên cô dâu
    shortName: "Thu Trang",
    initial: "T",
    title: "Cô Dâu",
    portrait: "/images/bride.jpg",
    bio: "Lời tâm sự của cô dâu...",
    family: {
      parentsTitle: "Nhà Gái",
      fatherName: "Lê Quốc Toàn",
      motherName: "Phạm Thu Hà",
      note: "Ái nữ",
    },
  },
  monogram: "Q & T", // Chữ lồng đại diện
  hashtag: "#QuangTrang2026",
}
```

### 2.2. Đặt ngày giờ cưới & Kích hoạt Đồng hồ đếm ngược
Tìm đến `weddingDateIso` và `weddingDateDisplay`:
```ts
// Định dạng chuẩn ISO: NĂM-THÁNG-NGÀYTHỜI_GIAN+07:00
weddingDateIso: "2026-11-28T18:00:00+07:00", 

// Chữ hiển thị trang trọng trên thiệp
weddingDateDisplay: "28 . 11 . 2026", 
```
*Lưu ý: Nếu chưa ấn định ngày chính xác, bạn chỉ cần để `weddingDateIso: ""` -> Khối đồng hồ đếm ngược sẽ tự động ẩn.*

### 2.3. Thay đổi ảnh Hero (Ảnh bìa lớn)
Lưu file ảnh cưới của bạn vào thư mục `public/images/` (ví dụ `public/images/hero.jpg`), sau đó cập nhật:
```ts
hero: {
  heroImage: "/images/hero.jpg",
  greeting: "TRÂN TRỌNG KÍNH MỜI",
  invitationQuote: "Cùng nhau viết tiếp câu chuyện tình yêu.",
  subQuote: "Chúng mình hạnh phúc khi được chia sẻ ngày đặc biệt này cùng những người thân yêu.",
}
```

### 2.4. Thêm & thay đổi Album ảnh cưới (Photo Gallery)
Trong phần `gallery: [...]`:
```ts
gallery: [
  {
    id: "photo-1",
    src: "/images/gallery-1.jpg", // Đường dẫn ảnh hoặc link CDN
    title: "Khoảnh khắc trao nhẫn",
    aspectRatio: "portrait", // "portrait" (đứng), "landscape" (ngang), hoặc "square" (vuông)
  },
  {
    id: "photo-2",
    src: "/images/gallery-2.jpg",
    title: "Nụ cười rạng rỡ",
    aspectRatio: "landscape",
  },
]
```
*Khi khách chạm vào bất kỳ ảnh nào, hệ thống sẽ mở trình xem ảnh toàn màn hình (Lightbox) với nút chuyển ảnh, phím mũi tên và phím ESC để đóng.*

### 2.5. Thêm cột mốc Câu chuyện tình yêu (Our Love Story)
Trong phần `loveStory: [...]`:
```ts
loveStory: [
  {
    id: "s1",
    yearOrDate: "Thu 2021",
    title: "Lần đầu gặp gỡ",
    story: "Một buổi chiều mùa thu dịu dàng ở quán cà phê nhỏ...",
    photo: "/images/story-1.jpg", // Có thể có ảnh hoặc để trống
  },
]
```

### 2.6. Nhập thông tin sự kiện, địa chỉ & Link Google Maps
Hỗ trợ nhiều sự kiện (Lễ Vu Quy, Lễ Thành Hôn, Tiệc Cưới...):
```ts
events: [
  {
    id: "event-1",
    title: "Lễ Thành Hôn & Tiệc Cưới",
    subtitle: "Tiệc mừng trọng thể",
    date: "2026-11-28",
    timeDisplay: "18:00 Tối",
    startTimeIso: "2026-11-28T18:00:00+07:00", // Dùng để khách nhấn "Thêm vào lịch" (.ics)
    endTimeIso: "2026-11-28T21:30:00+07:00",
    venueName: "Trung tâm Tiệc cưới Grand Palace",
    address: "142 Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh",
    note: "Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng mình.",
    mapUrl: "https://maps.google.com/?q=Grand+Palace+Ho+Chi+Minh", // Link Google Maps
  },
]
```
- Khi có `mapUrl`: Nút **"Chỉ đường"** sẽ tự động hiển thị để khách mở chỉ đường trên điện thoại.
- Khi có `startTimeIso`: Nút **"Thêm vào lịch"** sẽ xuất hiện cho phép tải file lịch `.ics` tương thích Apple Calendar, Google Calendar, Outlook.

### 2.7. Thiết lập Lịch trình trong ngày cưới (Day Timeline)
Trong phần `timeline: [...]`:
```ts
timeline: [
  { id: "tl-1", time: "17:30", title: "Đón khách & Chụp ảnh lưu niệm", iconName: "camera" },
  { id: "tl-2", time: "18:30", title: "Nghi thức Hôn lễ", iconName: "heart" },
  { id: "tl-3", time: "19:00", title: "Khai tiệc mừng", iconName: "wine" },
  { id: "tl-4", time: "20:15", title: "Giao lưu & Âm nhạc", iconName: "sparkles" },
]
```

### 2.8. Gợi ý trang phục (Dress Code) & Câu hỏi thường gặp (FAQ)
- **Dress Code**: Cấu hình các màu sắc trang phục trong `dressCode: { colors: [...] }`.
- **FAQ**: Thêm các câu hỏi và câu trả lời trong `faqs: [...]`.

---

## 3. FILE NHẠC NỀN MP3 (BACKGROUND MUSIC)

- File nhạc nền MP3 chính thức đã được tích hợp sẵn tại:
  📁 `public/audio/wedding-music.mp3` (Được sao chép chính xác từ file MP3 đính kèm của chủ tiệc, bài hát "I Do").
- Cấu hình trong `weddingConfig.ts`:
  ```ts
  audio: {
    src: "/audio/wedding-music.mp3",
    trackTitle: "I Do",
    artist: "911 / Wedding Acoustic Edition",
    initialVolume: 0.75,
    fadeInDurationMs: 1500,
  }
  ```
- **Cơ chế phát nhạc chuẩn Web hiện đại**:
  1. Trình duyệt thường chặn nhạc tự phát có tiếng (Autoplay Policy).
  2. Khi khách chạm vào nút **"Mở thiệp"**, hệ thống sẽ lập tức bắt đầu phát nhạc với hiệu ứng tăng âm lượng êm dịu (Volume Fade-in).
  3. Nút điều khiển nhạc luôn ghim cố định ở góc dưới bên phải màn hình (cả máy tính và điện thoại), cho phép Tắt / Bật nhạc bất cứ lúc nào mà không làm gián đoạn hay phát lại bài hát từ đầu khi cuộn trang.

---

## 4. HƯỚNG DẪN XEM TRƯỚC VÀ XUẤT BẢN WEBSITE (PREVIEW & DEPLOY)

### Cài đặt môi trường (nếu chưa có):
Cần cài đặt **Node.js** (phiên bản 18 trở lên).

### Khởi chạy xem thử trên máy tính:
Mở Terminal/PowerShell tại thư mục dự án và chạy:
```bash
npm run dev
```
Truy cập địa chỉ hiển thị trên màn hình (thường là `http://localhost:5173/`).

### Đóng gói website để đưa lên hosting:
Chạy lệnh:
```bash
npm run build
```
Toàn bộ mã nguồn website tĩnh hoàn chỉnh sẽ được tạo ra trong thư mục:
📁 `dist/`

### Cách đưa lên mạng miễn phí & nhanh chóng:
Bạn có thể tải toàn bộ thư mục `dist/` lên các dịch vụ hosting miễn phí hàng đầu:
- **Vercel** (`vercel.com`): Kéo thả thư mục dự án hoặc kết nối Git.
- **Netlify** (`netlify.com`): Kéo thả thư mục `dist` vào trình duyệt để có ngay link website trong 10 giây.
- **GitHub Pages**: Đẩy nhánh `gh-pages` chứa thư mục `dist`.

Chúc hai bạn có một ngày trọng đại thật viên mãn và ngập tràn hạnh phúc!
