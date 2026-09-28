# Bigjimakeup — เว็บ Portfolio

เว็บ portfolio ช่างแต่งหน้าที่ภูเก็ต · Next.js 16 (App Router) + Tailwind CSS 4 · สองภาษา ไทย/อังกฤษ

```bash
npm install
npm run dev     # http://localhost:3000 → redirect ไป /th หรือ /en ตามภาษาเบราว์เซอร์
npm run build   # ออกเป็นหน้า static ทั้ง /th และ /en
npm run lint
```

## โครงสร้าง

```
app/[lang]/layout.tsx   root layout, ฟอนต์, metadata, JSON-LD (BeautySalon)
proxy.ts                หน้า / เลือกภาษาจาก Accept-Language (ไทยอันดับแรก → /th, อื่น ๆ → /en)
app/[lang]/page.tsx     ลำดับ section ของหน้าเดียวจบ
app/[lang]/not-found.tsx  หน้า 404 สองภาษา
app/icon.png            favicon (monogram ชั่วคราว — เปลี่ยนเป็นโลโก้จริงได้)
app/apple-icon.png      ไอคอนตอนบันทึกลงจอโฮม iOS
app/manifest.ts         web app manifest
app/globals.css         โทนสีและฟอนต์ทั้งเว็บ (@theme ของ Tailwind 4)
content/site.ts         ★ ข้อมูลทั้งเว็บอยู่ที่นี่ไฟล์เดียว
lib/i18n.ts             locale + helper
lib/links.ts            ลิงก์ติดต่อ (พ่วง ref=website ไว้ทุกอัน)
components/             section ต่าง ๆ
public/images/          รูปทั้งหมด
```

## สิ่งที่ต้องแก้ก่อนส่งงานจริง

ทุกจุดที่ต้องแก้ทำเครื่องหมาย `PLACEHOLDER` ไว้ใน `content/site.ts`:

1. **ช่องทางติดต่อ** — `site.contact` ✓ ยืนยันแล้วทุกช่อง (เบอร์โทร, LINE ส่วนตัว, WhatsApp, Instagram, Facebook, อีเมล)
   - หน้าไทยใช้ LINE เป็นแชทหลัก หน้าอังกฤษใช้ WhatsApp (`primaryChat` ใน `lib/links.ts`)
   - ถ้าเป็น LINE OA ให้เปลี่ยน `lineUrl` เป็นลิงก์ `https://lin.ee/xxxxxxx`
     และใส่ `lineOaId` (Basic ID เช่น `@123abcde`) — ปุ่ม "ส่งผ่าน LINE" จะเปิดแชทพร้อมข้อความจองให้เลย
2. **ราคาและแพ็กเกจ** — `site.services` ✓ ราคาผู้ว่าจ้างยืนยันแล้ว
   - ถ้าแก้ราคา ต้องแก้ทั้ง `price` (ข้อความบนเว็บ) และ `amount` (ตัวเลขที่ส่งให้ Google)
   - ราคาที่ขึ้นต้นว่า "เริ่มต้น" ให้ใส่ `fromPrice: true` ด้วย (Google จะเห็นเป็นราคาต่ำสุด)
3. **รีวิว** — `site.testimonials` ต้องเป็นรีวิวจริง และขออนุญาตลูกค้าก่อนลงชื่อ
   - `site.rating` ตอนนี้เป็น `null` = ไม่ส่ง AggregateRating ให้ Google
     ใส่ได้เฉพาะตัวเลขจริงเท่านั้น ตัวเลขปลอมผิดนโยบายและโดน manual action ได้ทั้งเว็บ
   - `site.stats` (8+ ปี / 500+ เจ้าสาว / 4.9) และประวัติใน `site.about` ก็ยังเป็นของสมมติ ต้องยืนยันเช่นกัน
4. **โดเมน** — `site.seo.url` ตอนนี้ตั้งไว้ `https://bigjimakeup.com` ถ้าใช้โดเมนอื่นต้องแก้ (มีผลกับ sitemap, OG, canonical)
5. **รูปภาพ** — ดูหัวข้อถัดไป

### รูปภาพ

ใส่รูปจริงครบแล้ว: รูปหน้าแรก, รูปช่าง, `og.jpg` และผลงาน 4 รูปใน `portfolio/` (ต้นฉบับอยู่ใน `photos-original/` ซึ่งไม่ขึ้น git)

**เปลี่ยนรูปให้ตั้งชื่อไฟล์ใหม่เสมอ แล้วแก้ path ในโค้ด** — ถ้าใช้ชื่อเดิม `next/image` และเบราว์เซอร์จะ cache รูปเก่าไว้ต่อ
(ข้อยกเว้นคือ `og.jpg` ที่ไม่ผ่าน `next/image`)

| ไฟล์ | ใช้ที่ไหน | สัดส่วน / ขนาดแนะนำ |
| --- | --- | --- |
| `public/images/hero-nude-glam.jpg` (ตั้งใน `components/Hero.tsx`) | รูปใหญ่หน้าแรก | 4:5 · 1000×1250 ขึ้นไป |
| `public/images/artist-bigji.jpg` (ตั้งใน `site.about.image`) | รูปช่างในหัวข้อ "เกี่ยวกับช่าง" | 4:5 · 900×1100 (ตอนนี้ 529×661 — ถ้ามีไฟล์ใหญ่กว่านี้ควรเปลี่ยน) |
| `public/images/portfolio/*.jpg` | แกลเลอรีผลงาน (ตอนนี้ 4 รูป) | 4:5 · 800×1000 |
| `public/images/og.jpg` | รูปตอนแชร์ลิงก์ | 1.91:1 · 1200×630 |

เพิ่มรูปผลงาน: วางไฟล์ใน `public/images/portfolio/` แล้วเพิ่มบรรทัดใน `site.gallery` พร้อมคำบรรยายและหมวด
(หมวด: `bridal` / `event` / `editorial` — หมวดที่ยังไม่มีรูปจะไม่โชว์ปุ่ม)

## แบบฟอร์มจอง

ฟอร์มไม่มี backend — ประกอบข้อความจากที่กรอก แล้วให้เลือกส่งต่อ 3 ทาง:
ส่งผ่าน LINE / เปิดอีเมล / คัดลอกอย่างเดียว

ปุ่ม LINE: ถ้าตั้ง `site.contact.lineOaId` ไว้ จะเปิดแชท OA พร้อมข้อความที่พิมพ์ไว้ให้ (ลูกค้ากดส่งอย่างเดียว)
ถ้าเป็น `null` (LINE ส่วนตัว) จะคัดลอกข้อความแล้วเปิด LINE ให้ลูกค้าวางเอง
ไม่ต้องมีเซิร์ฟเวอร์ ไม่ต้องดูแลระบบ และไม่เก็บข้อมูลส่วนตัวของลูกค้าไว้ที่ไหน

ถ้าภายหลังอยากได้ลีดเข้าอีเมลหรือ Google Sheet อัตโนมัติ ให้ต่อ endpoint
(เช่น Formspree, Web3Forms, หรือ Route Handler ของ Next เอง) ในฟังก์ชัน `sendViaLine` / `sendViaMail`
ที่ `components/Booking.tsx`

## การนับว่างานไหนมาจากเว็บ

ลิงก์ติดต่อทุกอันพ่วง `ref=website` ไว้ และหัวข้อข้อความที่ฟอร์มสร้างจะขึ้นต้นว่า
"สอบถามคิวแต่งหน้า (จากเว็บไซต์)" เพื่อให้ผู้ว่าจ้างแยกออกว่างานไหนมาจากเว็บ

### Google Analytics

คัดลอก `.env.example` เป็น `.env.local` แล้วใส่ Measurement ID:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

ถ้าไม่ตั้งค่า เว็บจะไม่โหลดสคริปต์ GA เลย (ทุกอย่างอื่นทำงานปกติ)

event ที่ยิงไว้แล้ว — ตั้งเป็น conversion ใน GA4 ได้เลย:

| event | ยิงเมื่อ | พารามิเตอร์ |
| --- | --- | --- |
| `contact_line` | กดลิงก์ LINE ที่ไหนก็ได้ | `location` = id ของ section หรือ `header` / `footer` / `mobile-bar` |
| `contact_phone` | กดเบอร์โทร | `location` |
| `contact_email` | กดอีเมล | `location` |
| `contact_whatsapp` | กดลิงก์ WhatsApp | `location` |
| `contact_instagram` | กดลิงก์ IG | `location` |
| `contact_facebook` | กดลิงก์ Facebook | `location` |
| `booking_cta` | กดปุ่มที่พาไป `#booking` | `location` |
| `booking_submit` | ส่งฟอร์มจอง | `method` = line/whatsapp/email/copy, `service` |

การดักคลิกอยู่ที่ `components/Analytics.tsx` (ดักที่ระดับ document ไม่ต้องใส่ onClick ทีละปุ่ม)
ส่วนฟอร์มยิง event เองใน `components/Booking.tsx`

### แนะนำเพิ่ม

- ทำ Google Business Profile ของร้าน แล้วลิงก์มาที่เว็บ (คนค้น "ช่างแต่งหน้าภูเก็ต" ส่วนใหญ่มาจากตรงนี้)

## SEO ที่ทำไว้แล้ว

- หน้า static แยกภาษา `/th` `/en` พร้อม canonical และ hreflang (`x-default` ชี้ไป `/` ที่เลือกภาษาให้)
- JSON-LD `BeautySalon` (พื้นที่ให้บริการ ภูเก็ต/พังงา/กระบี่ + รายการบริการ) และ `FAQPage`
  (AggregateRating จะส่งก็ต่อเมื่อ `site.rating` ไม่ใช่ `null`)
- OpenGraph / Twitter card, `sitemap.xml`, `robots.txt`

## Deploy

ขึ้น Vercel ได้เลย (import repo → Deploy ไม่ต้องตั้งค่าอะไรเพิ่ม)
อย่าลืมแก้ `site.seo.url` เป็นโดเมนจริงก่อน build รอบสุดท้าย
