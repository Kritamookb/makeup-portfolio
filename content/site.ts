import type { L } from "@/lib/i18n";

/**
 * ------------------------------------------------------------------
 *  ข้อมูลทั้งเว็บอยู่ในไฟล์นี้ไฟล์เดียว — แก้ที่นี่ที่เดียวพอ
 *  ค่าที่ยังเป็น PLACEHOLDER ให้แทนที่ด้วยข้อมูลจริงจากผู้ว่าจ้าง
 * ------------------------------------------------------------------
 */

export const site = {
  /** PLACEHOLDER: ชื่อแบรนด์ / ชื่อช่าง */
  brand: {
    name: "BLOOM",
    full: { th: "BLOOM Makeup Artist", en: "BLOOM Makeup Artist" } as L,
    artist: { th: "คุณบลูม", en: "Bloom" } as L,
    tagline: {
      th: "ช่างแต่งหน้าเจ้าสาว จังหวัดภูเก็ต",
      en: "Bridal & Event Makeup Artist in Phuket",
    } as L,
  },

  /** PLACEHOLDER: ช่องทางติดต่อจริง */
  contact: {
    phone: "0812345678",
    phoneDisplay: "081-234-5678",
    lineId: "bloommakeup",
    /** ลิงก์เพิ่มเพื่อนไลน์ — ถ้าเป็น LINE OA ให้เปลี่ยนเป็น https://lin.ee/xxxxxxx */
    lineUrl: "https://line.me/ti/p/~bloommakeup",
    instagram: "bloom.makeup.phuket",
    instagramUrl: "https://instagram.com/bloom.makeup.phuket",
    facebook: "BLOOM Makeup Phuket",
    facebookUrl: "https://facebook.com/bloommakeupphuket",
    email: "hello@bloommakeup.com",
    area: {
      th: "ภูเก็ต · พังงา · กระบี่ (เดินทางถึงที่)",
      en: "Phuket · Phang Nga · Krabi (on-location service)",
    } as L,
    hours: {
      th: "ทุกวัน 06:00 – 21:00 น.",
      en: "Daily 6:00 AM – 9:00 PM",
    } as L,
  },

  /** สถิติสั้น ๆ ใต้ hero — ใช้สร้างความน่าเชื่อถือ */
  stats: [
    {
      value: "8+",
      label: { th: "ปีประสบการณ์", en: "Years of experience" } as L,
    },
    {
      value: "500+",
      label: { th: "เจ้าสาวที่ดูแล", en: "Brides served" } as L,
    },
    {
      value: "4.9",
      label: { th: "คะแนนรีวิวเฉลี่ย", en: "Average rating" } as L,
    },
  ],

  services: [
    {
      id: "bridal",
      name: { th: "แต่งหน้าเจ้าสาว", en: "Bridal Makeup" } as L,
      price: { th: "เริ่มต้น 6,500 บาท", en: "From ฿6,500" } as L,
      desc: {
        th: "ดูแลตั้งแต่ทดลองแต่ง ยันเก็บงานหลังพิธี พร้อมทำผมและติดขนตา แต่งทนได้ทั้งวันในอากาศร้อนชื้นของภูเก็ต",
        en: "From the trial session through post-ceremony touch-ups, including hairstyling and lashes — built to last a full day in Phuket's heat and humidity.",
      } as L,
      includes: [
        { th: "ทดลองแต่งหน้า 1 ครั้ง", en: "One trial session" } as L,
        { th: "แต่งหน้า + ทำผม วันงาน", en: "Wedding-day makeup & hair" } as L,
        { th: "เก็บงานระหว่างพิธี", en: "On-site touch-ups" } as L,
      ],
    },
    {
      id: "bridal-party",
      name: { th: "เพื่อนเจ้าสาว & ครอบครัว", en: "Bridal Party & Family" } as L,
      price: { th: "ท่านละ 1,800 บาท", en: "฿1,800 per person" } as L,
      desc: {
        th: "แต่งหน้าทำผมให้เพื่อนเจ้าสาว คุณแม่ และญาติ ๆ ในโทนที่เข้าชุดกันทั้งงาน มีทีมช่างเสริมเมื่อจองหลายท่าน",
        en: "Coordinated looks for bridesmaids, mothers and relatives. Additional artists are arranged for larger groups.",
      } as L,
      includes: [
        { th: "แต่งหน้า + จัดทรงผม", en: "Makeup & hairstyling" } as L,
        { th: "โทนเข้าชุดกับเจ้าสาว", en: "Matched to the bride's palette" } as L,
        { th: "จอง 4 ท่านขึ้นไป มีส่วนลด", en: "Group discount from 4 people" } as L,
      ],
    },
    {
      id: "prewedding",
      name: { th: "พรีเวดดิ้ง & ถ่ายภาพ", en: "Pre-wedding & Photoshoot" } as L,
      price: { th: "เริ่มต้น 4,500 บาท", en: "From ฿4,500" } as L,
      desc: {
        th: "แต่งหน้าสำหรับถ่ายภาพริมทะเล ในสตูดิโอ หรือโลเคชันในภูเก็ต เปลี่ยนลุคได้ตามคอนเซปต์ พร้อมดูแลตลอดกอง",
        en: "Makeup for beach, studio or on-location shoots around Phuket, with look changes through the day and on-set care.",
      } as L,
      includes: [
        { th: "เปลี่ยนลุคได้ 2 ลุค", en: "Up to two looks" } as L,
        { th: "ดูแลตลอดการถ่ายทำ", en: "Full-shoot standby" } as L,
        { th: "เดินทางในภูเก็ตฟรี", en: "Free travel within Phuket" } as L,
      ],
    },
    {
      id: "event",
      name: { th: "งานอีเวนต์ & งานเลี้ยง", en: "Events & Parties" } as L,
      price: { th: "เริ่มต้น 2,500 บาท", en: "From ฿2,500" } as L,
      desc: {
        th: "งานแต่งเพื่อน งานรับปริญญา งานเลี้ยงบริษัท หรือปาร์ตี้ริมหาด เลือกได้ทั้งลุคใสธรรมชาติและลุคจัดเต็ม",
        en: "Graduations, galas, beach parties or company events — from soft natural looks to full glam.",
      } as L,
      includes: [
        { th: "แต่งหน้าลุคที่เลือกเอง", en: "Your choice of look" } as L,
        { th: "จัดทรงผมพื้นฐาน", en: "Basic hairstyling" } as L,
        { th: "ติดขนตาปลอม", en: "False lashes included" } as L,
      ],
    },
    {
      id: "lesson",
      name: { th: "คอร์สสอนแต่งหน้า", en: "Makeup Lessons" } as L,
      price: { th: "คอร์สละ 3,500 บาท", en: "฿3,500 per course" } as L,
      desc: {
        th: "สอนตัวต่อตัว 3 ชั่วโมง เรียนรู้การแต่งหน้าให้เข้ากับโครงหน้าตัวเอง พร้อมลิสต์เครื่องสำอางที่เหมาะกับผิวคุณ",
        en: "A three-hour one-to-one class on working with your own features, plus a product list matched to your skin.",
      } as L,
      includes: [
        { th: "เรียนตัวต่อตัว 3 ชม.", en: "3-hour private class" } as L,
        { th: "ลงมือแต่งเองจริง", en: "Hands-on practice" } as L,
        { th: "ลิสต์เครื่องสำอางแนะนำ", en: "Personalised product list" } as L,
      ],
    },
    {
      id: "tourist",
      name: { th: "นักท่องเที่ยว & ถ่ายภาพหาด", en: "Holiday & Beach Shoots" } as L,
      price: { th: "เริ่มต้น 2,000 บาท", en: "From ฿2,000" } as L,
      desc: {
        th: "บริการถึงโรงแรมและรีสอร์ททั่วภูเก็ต จองล่วงหน้าได้จากต่างประเทศ สื่อสารภาษาอังกฤษได้",
        en: "Hotel and resort visits across Phuket. Book ahead from overseas — English-speaking service.",
      } as L,
      includes: [
        { th: "ถึงโรงแรมที่พัก", en: "In-room hotel service" } as L,
        { th: "จองล่วงหน้าออนไลน์", en: "Book online in advance" } as L,
        { th: "สื่อสารภาษาอังกฤษ", en: "English-speaking artist" } as L,
      ],
    },
  ],

  galleryFilters: [
    { id: "all", label: { th: "ทั้งหมด", en: "All" } as L },
    { id: "bridal", label: { th: "เจ้าสาว", en: "Bridal" } as L },
    { id: "event", label: { th: "อีเวนต์", en: "Events" } as L },
    { id: "editorial", label: { th: "ถ่ายแบบ", en: "Editorial" } as L },
  ],

  /** PLACEHOLDER: แทนที่ไฟล์ใน /public/images/portfolio ด้วยรูปผลงานจริง (ชื่อไฟล์เดิม หรือแก้ src ตรงนี้) */
  gallery: [
    { src: "/images/portfolio/01.jpg", category: "bridal", caption: { th: "เจ้าสาวริมทะเล · หาดสุรินทร์", en: "Beach bride · Surin Beach" } as L },
    { src: "/images/portfolio/02.jpg", category: "editorial", caption: { th: "ถ่ายแบบลุคคลีน", en: "Clean editorial look" } as L },
    { src: "/images/portfolio/03.jpg", category: "bridal", caption: { th: "พิธีเช้า ชุดไทย", en: "Thai ceremony, morning" } as L },
    { src: "/images/portfolio/04.jpg", category: "event", caption: { th: "งานรับปริญญา", en: "Graduation day" } as L },
    { src: "/images/portfolio/05.jpg", category: "bridal", caption: { th: "เจ้าสาวลุคโรแมนติก", en: "Romantic bridal" } as L },
    { src: "/images/portfolio/06.jpg", category: "editorial", caption: { th: "แคมเปญรีสอร์ท", en: "Resort campaign" } as L },
    { src: "/images/portfolio/07.jpg", category: "event", caption: { th: "งานเลี้ยงริมหาด", en: "Beach party" } as L },
    { src: "/images/portfolio/08.jpg", category: "bridal", caption: { th: "งานเย็น ลุคจัดเต็ม", en: "Evening reception glam" } as L },
    { src: "/images/portfolio/09.jpg", category: "editorial", caption: { th: "พรีเวดดิ้งในสตูดิโอ", en: "Studio pre-wedding" } as L },
    { src: "/images/portfolio/10.jpg", category: "event", caption: { th: "งานบริษัท", en: "Corporate gala" } as L },
    { src: "/images/portfolio/11.jpg", category: "bridal", caption: { th: "เพื่อนเจ้าสาว 6 ท่าน", en: "Bridal party of six" } as L },
    { src: "/images/portfolio/12.jpg", category: "editorial", caption: { th: "ลุคแฟชั่นโทนอุ่น", en: "Warm-tone fashion" } as L },
  ],

  about: {
    image: "/images/artist.jpg",
    heading: {
      th: "แต่งให้เป็นตัวคุณในวันที่สำคัญที่สุด",
      en: "Looking like yourself, on the day that matters most",
    } as L,
    body: [
      {
        th: "เริ่มต้นจากการเป็นผู้ช่วยช่างแต่งหน้าในงานแต่งริมทะเลเมื่อแปดปีก่อน วันนี้ดูแลเจ้าสาวมาแล้วกว่า 500 คน ทั้งงานไทย งานสากล และงานของคู่รักชาวต่างชาติที่บินมาแต่งงานที่ภูเก็ต",
        en: "I started as an assistant at a beachside wedding eight years ago. Since then I have worked with more than 500 brides — Thai ceremonies, western weddings, and couples who fly to Phuket to marry.",
      } as L,
      {
        th: "อากาศภูเก็ตร้อนและชื้น เครื่องสำอางที่ใช้จึงคัดมาเพื่อให้ติดทนตลอดวัน กันเหงื่อ กันน้ำตา และยังดูเป็นผิวจริงในภาพถ่าย ไม่หนักหน้า",
        en: "Phuket is hot and humid, so every product is chosen to hold through the day — sweat-proof, tear-proof, and still reading as real skin on camera.",
      } as L,
      {
        th: "ทุกงานเริ่มจากการคุยกันก่อนเสมอ ว่าคุณอยากเป็นแบบไหนในรูปที่จะเก็บไว้ทั้งชีวิต",
        en: "Every booking starts with a conversation about who you want to be in the photographs you will keep for life.",
      } as L,
    ],
    credentials: [
      { th: "ประกาศนียบัตร Professional Makeup Artistry", en: "Certified in Professional Makeup Artistry" } as L,
      { th: "ช่างแต่งหน้าประจำรีสอร์ทชั้นนำในภูเก็ต", en: "Preferred artist for leading Phuket resorts" } as L,
      { th: "เครื่องสำอางแบรนด์เคาน์เตอร์ · สะอาด ปลอดภัยทุกชิ้น", en: "Counter-brand products, sanitised for every client" } as L,
      { th: "สื่อสารได้ทั้งภาษาไทยและภาษาอังกฤษ", en: "Fluent in Thai and English" } as L,
    ],
  },

  process: [
    {
      step: "01",
      title: { th: "ทักมาคุยกันก่อน", en: "Say hello" } as L,
      desc: {
        th: "ส่งวันงาน สถานที่ และลุคที่ชอบมาทาง LINE หรือแบบฟอร์ม ตอบกลับภายในวันเดียว",
        en: "Send your date, venue and the looks you like via LINE or the form. I reply within a day.",
      } as L,
    },
    {
      step: "02",
      title: { th: "เลือกแพ็กเกจ & จองวัน", en: "Choose a package" } as L,
      desc: {
        th: "สรุปแพ็กเกจและราคาชัดเจนก่อนเสมอ มัดจำ 30% เพื่อกันวัน ไม่มีค่าใช้จ่ายแอบแฝง",
        en: "A clear quote first, then a 30% deposit holds your date. No hidden fees.",
      } as L,
    },
    {
      step: "03",
      title: { th: "ทดลองแต่งหน้า", en: "Trial session" } as L,
      desc: {
        th: "สำหรับงานแต่ง นัดทดลองแต่งล่วงหน้า ปรับจนได้ลุคที่ใช่ พร้อมถ่ายรูปเทียบแสงจริง",
        en: "For weddings we meet beforehand, adjust the look until it is right, and photograph it in natural light.",
      } as L,
    },
    {
      step: "04",
      title: { th: "ถึงที่ในวันงาน", en: "On the day" } as L,
      desc: {
        th: "ไปถึงก่อนเวลาเสมอ พร้อมชุดเก็บงานระหว่างพิธี ให้คุณสวยตั้งแต่เช้าจนภาพสุดท้าย",
        en: "I arrive early with a touch-up kit and stay until the last photograph.",
      } as L,
    },
  ],

  /** PLACEHOLDER: เปลี่ยนเป็นรีวิวจริงจากลูกค้า (ขออนุญาตก่อนลงชื่อ) */
  testimonials: [
    {
      name: "Nutcha P.",
      role: { th: "เจ้าสาว · หาดกะตะ", en: "Bride · Kata Beach" } as L,
      quote: {
        th: "ร้อนมากแต่หน้าไม่เคลื่อนเลยทั้งวัน ถ่ายรูปออกมาเป็นผิวจริง ไม่เหมือนใส่หน้ากาก คุณแม่ยังชมไม่หยุด",
        en: "It was blazing hot and my makeup did not move all day. In the photos it still looks like my own skin — my mother has not stopped talking about it.",
      } as L,
    },
    {
      name: "Sarah W.",
      role: { th: "เจ้าสาว · จากออสเตรเลีย", en: "Bride · from Australia" } as L,
      quote: {
        th: "จองจากต่างประเทศแล้วกังวลมาก แต่คุยภาษาอังกฤษง่ายมาก ส่งรูปคุยกันล่วงหน้าเป็นเดือน วันงานเลยไม่มีอะไรผิดพลาด",
        en: "Booking from overseas was nerve-wracking, but communication in English was effortless. We traded reference photos for a month and the day itself went perfectly.",
      } as L,
    },
    {
      name: "ปิยะฉัตร ส.",
      role: { th: "งานรับปริญญา", en: "Graduation" } as L,
      quote: {
        th: "ไม่ค่อยชอบแต่งหน้าหนัก ๆ บอกไปแล้วช่างฟังจริง ออกมาใสมาก แต่ในรูปยังคมชัด ราคาก็บอกชัดตั้งแต่แรก",
        en: "I do not like heavy makeup and she actually listened. It came out fresh but still sharp in photos, and the price was clear from the start.",
      } as L,
    },
  ],

  faq: [
    {
      q: { th: "ต้องจองล่วงหน้านานแค่ไหน?", en: "How far in advance should I book?" } as L,
      a: {
        th: "งานแต่งแนะนำจอง 3–6 เดือนล่วงหน้า โดยเฉพาะช่วงไฮซีซัน (พฤศจิกายน–เมษายน) ส่วนงานอีเวนต์ทั่วไปจอง 1–2 สัปดาห์ก็มักยังมีคิว",
        en: "For weddings, three to six months ahead — especially in high season (November–April). For other events, one to two weeks is usually enough.",
      } as L,
    },
    {
      q: { th: "มีค่าเดินทางเพิ่มไหม?", en: "Is there a travel fee?" } as L,
      a: {
        th: "ในเขตภูเก็ตไม่มีค่าเดินทางเพิ่ม พื้นที่พังงา กระบี่ หรือเกาะรอบนอก คิดตามระยะทางจริง แจ้งให้ทราบก่อนยืนยันเสมอ",
        en: "No travel fee within Phuket. Phang Nga, Krabi and the outer islands are charged at actual distance, always quoted before you confirm.",
      } as L,
    },
    {
      q: { th: "งานเช้ามากแต่งหน้าได้ไหม?", en: "Can you start very early?" } as L,
      a: {
        th: "ได้ค่ะ พิธีเช้าหลายงานเริ่มแต่งตั้งแต่ตี 4–5 ไม่มีค่าใช้จ่ายเพิ่มสำหรับรอบเช้า",
        en: "Yes. Many morning ceremonies start at 4–5 AM, and there is no surcharge for early calls.",
      } as L,
    },
    {
      q: { th: "ผิวแพ้ง่ายใช้ได้ไหม?", en: "I have sensitive skin — is that a problem?" } as L,
      a: {
        th: "แจ้งล่วงหน้าได้เลยค่ะ มีสินค้าสำหรับผิวแพ้ง่ายและปลอดน้ำหอม อุปกรณ์ทุกชิ้นทำความสะอาดก่อนใช้กับลูกค้าทุกคน",
        en: "Just let me know. I carry fragrance-free products for sensitive skin, and every tool is sanitised between clients.",
      } as L,
    },
    {
      q: { th: "มัดจำและการยกเลิกเป็นอย่างไร?", en: "What about deposits and cancellations?" } as L,
      a: {
        th: "มัดจำ 30% เพื่อกันวัน ยกเลิกก่อนงาน 30 วันคืนมัดจำเต็มจำนวน หลังจากนั้นสามารถเลื่อนวันได้ 1 ครั้งภายใน 6 เดือน",
        en: "A 30% deposit holds the date. Cancel more than 30 days out for a full refund; after that you may reschedule once within six months.",
      } as L,
    },
  ],

  seo: {
    /** PLACEHOLDER: โดเมนจริงหลัง deploy */
    url: "https://bloommakeup.example.com",
    title: {
      th: "ช่างแต่งหน้าภูเก็ต · แต่งหน้าเจ้าสาว ถึงที่ | BLOOM Makeup Artist",
      en: "Phuket Makeup Artist · Bridal & Event Makeup | BLOOM Makeup Artist",
    } as L,
    description: {
      th: "ช่างแต่งหน้าเจ้าสาวมืออาชีพในภูเก็ต บริการถึงที่ทั้งโรงแรม รีสอร์ท และริมหาด แต่งทนตลอดวัน ดูเป็นผิวจริงในภาพถ่าย ประสบการณ์กว่า 8 ปี",
      en: "Professional bridal and event makeup artist in Phuket. On-location service at hotels, resorts and beaches. Long-wearing, photograph-ready makeup with 8+ years of experience.",
    } as L,
  },
} as const;

export type Site = typeof site;
