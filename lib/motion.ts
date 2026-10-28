/** ผู้ใช้ไม่ได้ขอลดการเคลื่อนไหว — เรียกได้เฉพาะฝั่งเบราว์เซอร์ */
export function motionOk(): boolean {
  return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

/** อุปกรณ์มีเมาส์จริง (ไม่ใช่จอสัมผัส) — ใช้กับลูกเล่นที่ต้องชี้ */
export function finePointer(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * เรียก callback ทุกเฟรมที่มีการเลื่อนหน้า/ย่อขยายจอ (รวบเหลือครั้งเดียวต่อเฟรม)
 * คืนฟังก์ชันสำหรับยกเลิก
 */
export function onScrollFrame(callback: () => void): () => void {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  };

  callback();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

/**
 * ใช้กับลิงก์เปลี่ยนภาษา (คู่กับ scroll={false} บน <Link>)
 * ถ้าปล่อยให้ Next เลื่อนหน้าเอง มันจะเลื่อนแบบ smooth ไปหาเนื้อหาใหม่ และจากบนสุดจะไหลไปจบที่ล่างสุดของหน้า
 * เลยกระโดดขึ้นบนสุดทันทีแทน ("instant" ข้าม scroll-behavior: smooth ใน globals.css)
 */
export function jumpToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}
