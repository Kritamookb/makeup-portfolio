import Link from "next/link";

/**
 * ใช้ทั้งกรณี path ภาษาที่ไม่รู้จัก (เช่น /fr) และหน้าที่ไม่มีอยู่จริง
 * ข้อความใส่สองภาษาเลย เพราะตรงนี้ไม่รู้ว่าผู้ใช้อ่านภาษาไหน
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-24 text-center">
      <div className="max-w-md">
        <p className="eyebrow">404</p>

        <h1 className="mt-4 font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
          ไม่พบหน้านี้
          <span className="mt-1 block text-clay italic">Page not found</span>
        </h1>

        <span aria-hidden="true" className="mx-auto mt-6 block h-px w-16 bg-rose/60" />

        <p className="mt-6 text-sm leading-relaxed text-muted">
          ลิงก์อาจพิมพ์ผิดหรือถูกย้ายไปแล้ว กลับไปหน้าแรกเพื่อดูผลงานและจองคิวได้เลย
          <span className="mt-2 block">
            This link may be mistyped or moved. Head back to see the portfolio and book a date.
          </span>
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/th"
            className="rounded-full bg-ink px-7 py-3.5 text-sm text-cream transition-colors hover:bg-clay"
          >
            กลับหน้าแรก
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-clay/50 px-7 py-3.5 text-sm text-clay transition-colors hover:border-clay hover:bg-shell"
          >
            English home
          </Link>
        </div>
      </div>
    </main>
  );
}
