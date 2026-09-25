# BLOOM Makeup Artist — เว็บ Portfolio

เว็บ portfolio ช่างแต่งหน้าที่ภูเก็ต · Next.js 16 (App Router) + Tailwind CSS 4 · สองภาษา ไทย/อังกฤษ

```bash
npm install
npm run dev     # http://localhost:3000 → redirect ไป /th
npm run build   # ออกเป็นหน้า static ทั้ง /th และ /en
npm run lint
```

## โครงสร้าง

```
app/[lang]/layout.tsx   root layout, ฟอนต์, metadata, JSON-LD (BeautySalon)
app/[lang]/page.tsx     ลำดับ section ของหน้าเดียวจบ
app/globals.css         โทนสีและฟอนต์ทั้งเว็บ (@theme ของ Tailwind 4)
content/site.ts         ★ ข้อมูลทั้งเว็บอยู่ที่นี่ไฟล์เดียว
lib/i18n.ts             locale + helper
lib/links.ts            ลิงก์ติดต่อ (พ่วง ref=website ไว้ทุกอัน)
components/             section ต่าง ๆ
public/images/          รูปทั้งหมด
```

## สิ่งที่ต้องแก้ก่อนส่งงานจริง

ทุกจุดที่ต้องแก้ทำเครื่องหมาย `PLACEHOLDER` ไว้ใน `content/site.ts`:

1. **ชื่อแบรนด์และชื่อช่าง** — `site.brand`
2. **ช่องทางติดต่อ** — `site.contact` (เบอร์, LINE, IG, FB, อีเมล)
   - ถ้าเป็น LINE OA ให้เปลี่ยน `lineUrl` เป็นลิงก์ `https://lin.ee/xxxxxxx`
3. **ราคาและแพ็กเกจ** — `site.services` (ตอนนี้เป็นราคาตลาดโดยประมาณ ต้องให้ผู้ว่าจ้างยืนยัน)
4. **รีวิว** — `site.testimonials` ต้องเป็นรีวิวจริง และขออนุญาตลูกค้าก่อนลงชื่อ
5. **โดเมน** — `site.seo.url` ใส่โดเมนจริงหลัง deploy (มีผลกับ sitemap, OG, canonical)
6. **รูปภาพ** — ดูหัวข้อถัดไป

### รูปภาพ

รูปในตอนนี้เป็น placeholder ไล่เฉดสีที่สร้างขึ้นเอง ไม่ใช่ผลงานจริง ให้แทนที่ด้วยไฟล์ชื่อเดิม:

| ไฟล์ | ใช้ที่ไหน | สัดส่วน / ขนาดแนะนำ |
| --- | --- | --- |
| `public/images/hero.jpg` | รูปใหญ่หน้าแรก | 4:5 · 1000×1250 ขึ้นไป |
| `public/images/artist.jpg` | รูปช่างในหัวข้อ "เกี่ยวกับช่าง" | 4:5 · 900×1100 |
| `public/images/portfolio/01–12.jpg` | แกลเลอรีผลงาน | 4:5 · 800×1000 |
| `public/images/og.jpg` | รูปตอนแชร์ลิงก์ | 1.91:1 · 1200×630 |

เปลี่ยนคำบรรยายและหมวดของแต่ละรูปได้ที่ `site.gallery` (หมวด: `bridal` / `event` / `editorial`)

## แบบฟอร์มจอง

ฟอร์มไม่มี backend — ประกอบข้อความจากที่กรอก แล้วให้เลือกส่งต่อ 3 ทาง:
คัดลอกข้อความ + เปิด LINE / เปิดอีเมล / คัดลอกอย่างเดียว
ไม่ต้องมีเซิร์ฟเวอร์ ไม่ต้องดูแลระบบ และไม่เก็บข้อมูลส่วนตัวของลูกค้าไว้ที่ไหน

ถ้าภายหลังอยากได้ลีดเข้าอีเมลหรือ Google Sheet อัตโนมัติ ให้ต่อ endpoint
(เช่น Formspree, Web3Forms, หรือ Route Handler ของ Next เอง) ในฟังก์ชัน `sendViaLine` / `sendViaMail`
ที่ `components/Booking.tsx`

## การนับว่างานไหนมาจากเว็บ

ลิงก์ติดต่อทุกอันพ่วง `ref=website` ไว้ และหัวข้อข้อความที่ฟอร์มสร้างจะขึ้นต้นว่า
"สอบถามคิวแต่งหน้า (จากเว็บไซต์)" เพื่อให้ผู้ว่าจ้างแยกออกว่างานไหนมาจากเว็บ

แนะนำเพิ่มก่อนขึ้นจริง:
- ติด Google Analytics 4 หรือ Vercel Analytics แล้วตั้ง event ที่ปุ่ม LINE / โทร / ส่งฟอร์ม
- ทำ Google Business Profile ของร้าน แล้วลิงก์มาที่เว็บ (คนค้น "ช่างแต่งหน้าภูเก็ต" ส่วนใหญ่มาจากตรงนี้)

## SEO ที่ทำไว้แล้ว

- หน้า static แยกภาษา `/th` `/en` พร้อม canonical และ hreflang
- JSON-LD `BeautySalon` (พื้นที่ให้บริการ ภูเก็ต/พังงา/กระบี่ + รายการบริการ) และ `FAQPage`
- OpenGraph / Twitter card, `sitemap.xml`, `robots.txt`

## Deploy

ขึ้น Vercel ได้เลย (import repo → Deploy ไม่ต้องตั้งค่าอะไรเพิ่ม)
อย่าลืมแก้ `site.seo.url` เป็นโดเมนจริงก่อน build รอบสุดท้าย
