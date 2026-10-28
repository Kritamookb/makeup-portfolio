"use client";

import { useEffect, useRef } from "react";
import { motionOk } from "@/lib/motion";

/**
 * ตัวเลขนับขึ้นตอนเลื่อนมาถึง — รับค่าแบบ "500+" หรือ "4.9" แล้วคงคำต่อท้าย/จำนวนทศนิยมไว้
 * HTML จากเซิร์ฟเวอร์มีตัวเลขจริงเสมอ (Google เห็นค่าจริง)
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!node || !match || !motionOk()) return;

    const target = Number(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const render = (n: number) => {
      node.textContent = `${n.toFixed(decimals)}${match[2]}`;
    };

    // ตั้งเป็น 0 ไว้ก่อนตั้งแต่โหลด ไม่ให้เห็นเลขจริงแวบแล้วกระโดดกลับไปเริ่มนับ
    render(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1800);
          render(target * (1 - Math.pow(1 - t, 4)));
          if (t < 1) frame = requestAnimationFrame(tick);
          else node.textContent = value;
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
