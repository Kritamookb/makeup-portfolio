"use client";

import { useEffect, useRef } from "react";
import { motionOk, onScrollFrame } from "@/lib/motion";

/**
 * เลื่อนเนื้อหาช้ากว่า/เร็วกว่าหน้าเล็กน้อยตอนเลื่อน
 * range: ระยะสูงสุด (ค่าลบ = เลื่อนสวนทาง) — ใส่ค่าใน CSS เช่น "4rem", "-2rem"
 */
export default function Parallax({
  children,
  range = "3rem",
  className = "",
}: {
  children: React.ReactNode;
  range?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !motionOk()) return;

    return onScrollFrame(() => {
      // วัดจากกล่องแม่ — วัดตัวเองจะวัดตำแหน่งที่ถูกเลื่อนไปแล้ว
      const box = (node.parentElement ?? node).getBoundingClientRect();
      const viewport = window.innerHeight;
      if (box.bottom < -viewport || box.top > viewport * 2) return;
      // กึ่งกลางกล่องอยู่กลางจอ = 0 · ขอบล่างจอ = 1 · ขอบบนจอ = -1
      const progress = (box.top + box.height / 2 - viewport / 2) / (viewport / 2 + box.height / 2);
      node.style.setProperty("--p", Math.max(-1, Math.min(1, progress)).toFixed(4));
    });
  }, []);

  return (
    <div ref={ref} className={`parallax ${className}`} style={{ "--range": range } as React.CSSProperties}>
      {children}
    </div>
  );
}
