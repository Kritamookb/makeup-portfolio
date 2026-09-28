"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import {
  lineDisplay,
  lineHref,
  lineOaMessageHref,
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/links";
import { track } from "@/lib/track";
import type { Lang } from "@/lib/i18n";

const copy = {
  eyebrow: { th: "จองคิว", en: "Booking" },
  title: { th: "บอกรายละเอียดงานของคุณ", en: "Tell me about your day" },
  lead: {
    th: "กรอกสั้น ๆ แล้วส่งต่อทาง LINE หรืออีเมล ตอบกลับภายในวันเดียว ทุกวัน",
    en: "Fill this in, then send it via LINE or email. I reply within a day, every day.",
  },
  fields: {
    name: { th: "ชื่อของคุณ", en: "Your name" },
    contact: { th: "เบอร์โทร หรือ LINE ID", en: "Phone or LINE ID" },
    date: { th: "วันที่จัดงาน", en: "Event date" },
    venue: { th: "สถานที่ / โรงแรม", en: "Venue or hotel" },
    service: { th: "บริการที่สนใจ", en: "Service" },
    people: { th: "จำนวนคนที่ต้องแต่ง", en: "People to be made up" },
    note: { th: "รายละเอียดเพิ่มเติม", en: "Anything else" },
    notePlaceholder: {
      th: "เช่น เวลาเริ่มพิธี ลุคที่ชอบ หรือข้อจำกัดเรื่องผิว",
      en: "Ceremony time, looks you like, skin concerns…",
    },
  },
  required: { th: "จำเป็น", en: "required" },
  sendLine: { th: "ส่งผ่าน LINE", en: "Send via LINE" },
  sendWhatsapp: { th: "ส่งทาง WhatsApp", en: "Send via WhatsApp" },
  sendMail: { th: "ส่งทางอีเมล", en: "Send by email" },
  copy: { th: "คัดลอกข้อความ", en: "Copy message" },
  copied: { th: "คัดลอกแล้ว — วางในแชทได้เลย", en: "Copied — paste it into the chat" },
  chatOpened: {
    th: "เปิดแชทแล้ว — ข้อความพิมพ์ไว้ให้แล้ว กดส่งได้เลยครับ",
    en: "The chat is open with your message ready — just tap send.",
  },
  copyFailed: {
    th: "คัดลอกอัตโนมัติไม่สำเร็จ — กดค้างที่ข้อความด้านล่างเพื่อคัดลอก แล้ววางในแชท",
    en: "Couldn't copy automatically — select the text below, copy it and paste it into the chat.",
  },
  missing: {
    th: "กรอกชื่อ ช่องทางติดต่อ และวันที่จัดงานก่อนนะครับ",
    en: "Please add your name, a contact and the event date first.",
  },
  pastDate: {
    th: "วันที่จัดงานผ่านไปแล้ว — ลองเช็กวันหรือปีอีกครั้งนะครับ",
    en: "That date has already passed — please check the day and year.",
  },
  channels: { th: "หรือติดต่อโดยตรง", en: "Or reach out directly" },
};

/** วันนี้ตามเวลาเครื่องลูกค้า ในรูป YYYY-MM-DD ให้ตรงกับค่าของ input type="date" */
function localToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const noSubscribe = () => () => {};

type Form = {
  name: string;
  contact: string;
  date: string;
  venue: string;
  service: string;
  people: string;
  note: string;
};

const EMPTY: Form = { name: "", contact: "", date: "", venue: "", service: "", people: "", note: "" };

export default function Booking({ lang }: { lang: Lang }) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<
    "idle" | "copied" | "copyFailed" | "missing" | "pastDate" | "chatOpened"
  >("idle");
  // หน้าเป็น static — ตอน build ยังไม่รู้ว่า "วันนี้" คือวันไหน เลยให้เบราว์เซอร์ใส่ให้หลังโหลด
  const today = useSyncExternalStore(noSubscribe, localToday, () => "");

  // การ์ดบริการด้านบนกดมาแล้วให้เลือกบริการนั้นไว้ให้เลย
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-service]");
      if (!target?.dataset.service) return;
      setForm((current) => ({ ...current, service: target.dataset.service as string }));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const set = (key: keyof Form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setStatus("idle");
  };

  const serviceName = site.services.find((item) => item.id === form.service)?.name[lang] ?? "-";

  const message = [
    lang === "th" ? "สอบถามคิวแต่งหน้า (จากเว็บไซต์)" : "Makeup booking enquiry (from website)",
    "",
    `${copy.fields.name[lang]}: ${form.name || "-"}`,
    `${copy.fields.contact[lang]}: ${form.contact || "-"}`,
    `${copy.fields.date[lang]}: ${form.date || "-"}`,
    `${copy.fields.venue[lang]}: ${form.venue || "-"}`,
    `${copy.fields.service[lang]}: ${serviceName}`,
    `${copy.fields.people[lang]}: ${form.people || "-"}`,
    `${copy.fields.note[lang]}: ${form.note || "-"}`,
  ].join("\n");

  const complete = Boolean(form.name && form.contact && form.date);

  // พิมพ์วันที่เองก็ข้าม min ได้ ต้องเช็กซ้ำตรงนี้
  const pastDate = Boolean(today && form.date && form.date < today);

  const requireComplete = () => {
    if (!complete) setStatus("missing");
    else if (pastDate) setStatus("pastDate");
    return complete && !pastDate;
  };

  /**
   * ต้องเรียกตรง ๆ ใน click handler ก่อน window.open และห้าม await อะไรก่อนหน้า
   * ไม่งั้น Safari บล็อกการเปิด LINE และเบราว์เซอร์ไม่ยอมให้คัดลอกหลังหน้าเสียโฟกัส
   */
  const copyMessage = () => {
    let copying: Promise<void>;
    try {
      copying = navigator.clipboard.writeText(message);
    } catch (error) {
      // เว็บที่ไม่ใช่ https หรือเบราว์เซอร์เก่าไม่มี navigator.clipboard
      copying = Promise.reject(error);
    }
    copying.then(
      () => setStatus("copied"),
      () => setStatus("copyFailed"),
    );
  };

  const submitted = (method: string) =>
    track("booking_submit", { method, service: form.service || "unspecified" });

  const sendViaLine = () => {
    if (!requireComplete()) return;
    submitted("line");

    // LINE OA เปิดแชทพร้อมข้อความได้เลย · LINE ส่วนตัวทำไม่ได้ ต้องคัดลอกให้ลูกค้าไปวางเอง
    const oaId = site.contact.lineOaId;
    if (oaId) {
      setStatus("chatOpened");
      window.open(lineOaMessageHref(oaId, message), "_blank", "noopener,noreferrer");
      return;
    }

    copyMessage();
    window.open(lineHref, "_blank", "noopener,noreferrer");
  };

  // WhatsApp พิมพ์ข้อความไว้ให้ได้ทั้งบัญชีส่วนตัวและธุรกิจ ไม่ต้องคัดลอก
  const sendViaWhatsapp = () => {
    if (!requireComplete()) return;
    submitted("whatsapp");
    setStatus("chatOpened");
    window.open(whatsappHref(lang, message), "_blank", "noopener,noreferrer");
  };

  // ปุ่มหลักเป็นแอปที่คนหน้านั้นใช้ — ไทยใช้ LINE นักท่องเที่ยวใช้ WhatsApp
  const chats = [
    { label: copy.sendLine[lang], send: sendViaLine },
    { label: copy.sendWhatsapp[lang], send: sendViaWhatsapp },
  ];
  const [primary, secondary] = lang === "th" ? chats : [...chats].reverse();

  const sendViaMail = () => {
    if (!requireComplete()) return;
    submitted("email");
    window.location.href = mailtoHref(lang, message);
  };

  const copyOnly = () => {
    if (!requireComplete()) return;
    copyMessage();
    submitted("copy");
  };

  const field = "mt-1.5 w-full rounded-lg border border-blush bg-white/80 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-rose focus:ring-2 focus:ring-rose/20";
  const label = "block text-xs tracking-wide text-mauve uppercase th:tracking-normal";

  return (
    <section id="booking" className="scroll-mt-20 bg-cream py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} lead={copy.lead[lang]} />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <form
              className="grid gap-5 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                primary.send();
              }}
            >
              <div>
                <label className={label} htmlFor="name">
                  {copy.fields.name[lang]} *
                </label>
                <input id="name" className={field} value={form.name} onChange={set("name")} required />
              </div>

              <div>
                <label className={label} htmlFor="contact">
                  {copy.fields.contact[lang]} *
                </label>
                <input id="contact" className={field} value={form.contact} onChange={set("contact")} required />
              </div>

              <div>
                <label className={label} htmlFor="date">
                  {copy.fields.date[lang]} *
                </label>
                <input
                  id="date"
                  type="date"
                  min={today || undefined}
                  className={field}
                  value={form.date}
                  onChange={set("date")}
                  required
                />
              </div>

              <div>
                <label className={label} htmlFor="venue">
                  {copy.fields.venue[lang]}
                </label>
                <input id="venue" className={field} value={form.venue} onChange={set("venue")} />
              </div>

              <div>
                <label className={label} htmlFor="service">
                  {copy.fields.service[lang]}
                </label>
                <select id="service" className={field} value={form.service} onChange={set("service")}>
                  <option value="">—</option>
                  {site.services.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={label} htmlFor="people">
                  {copy.fields.people[lang]}
                </label>
                <input id="people" type="number" min={1} className={field} value={form.people} onChange={set("people")} />
              </div>

              <div className="sm:col-span-2">
                <label className={label} htmlFor="note">
                  {copy.fields.note[lang]}
                </label>
                <textarea
                  id="note"
                  rows={4}
                  className={field}
                  placeholder={copy.fields.notePlaceholder[lang]}
                  value={form.note}
                  onChange={set("note")}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-ink px-7 py-3.5 text-sm text-cream transition-colors hover:bg-clay"
                >
                  {primary.label}
                </button>
                <button
                  type="button"
                  onClick={secondary.send}
                  className="rounded-full border border-clay/50 px-7 py-3.5 text-sm text-clay transition-colors hover:border-clay hover:bg-shell"
                >
                  {secondary.label}
                </button>
                <button
                  type="button"
                  onClick={sendViaMail}
                  className="rounded-full border border-clay/50 px-7 py-3.5 text-sm text-clay transition-colors hover:border-clay hover:bg-shell"
                >
                  {copy.sendMail[lang]}
                </button>
                <button
                  type="button"
                  onClick={copyOnly}
                  className="text-sm text-mauve underline decoration-blush underline-offset-4 hover:text-ink"
                >
                  {copy.copy[lang]}
                </button>
              </div>

              <p
                role="status"
                aria-live="polite"
                className={`text-sm sm:col-span-2 ${status === "copied" || status === "chatOpened" ? "text-mauve" : "text-clay"}`}
              >
                {status === "idle" ? "" : copy[status][lang]}
              </p>

              {status === "copyFailed" ? (
                <textarea
                  readOnly
                  rows={9}
                  aria-label={copy.copy[lang]}
                  className={`${field} sm:col-span-2`}
                  value={message}
                  onFocus={(event) => event.currentTarget.select()}
                />
              ) : null}
            </form>
          </Reveal>

          <Reveal delay={90}>
            <div className="rounded-2xl border border-blush/60 bg-shell/60 p-7">
              <p className="eyebrow">{copy.channels[lang]}</p>

              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href={lineHref} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className="block text-xs text-muted">LINE</span>
                    <span className="font-display text-xl text-ink group-hover:text-clay">
                      {lineDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className="block text-xs text-muted">WhatsApp</span>
                    <span className="font-display text-xl text-ink group-hover:text-clay">
                      {site.contact.whatsappDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={telHref} className="group block">
                    <span className="block text-xs text-muted">
                      {lang === "th" ? "โทรศัพท์" : "Phone"}
                    </span>
                    <span className="font-display text-xl text-ink group-hover:text-clay">
                      {site.contact.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={mailtoHref(lang)} className="group block">
                    <span className="block text-xs text-muted">
                      {lang === "th" ? "อีเมล" : "Email"}
                    </span>
                    <span className="text-base text-ink group-hover:text-clay">
                      {site.contact.email}
                    </span>
                  </a>
                </li>
              </ul>

              <dl className="mt-7 space-y-3 border-t border-blush/70 pt-5 text-sm">
                <div>
                  <dt className="text-xs text-muted">
                    {lang === "th" ? "พื้นที่ให้บริการ" : "Service area"}
                  </dt>
                  <dd className="text-mauve">{site.contact.area[lang]}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">
                    {lang === "th" ? "เวลาติดต่อ" : "Hours"}
                  </dt>
                  <dd className="text-mauve">{site.contact.hours[lang]}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
