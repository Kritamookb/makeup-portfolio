"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ห่อเนื้อหาไว้ให้ขยับเข้ามาตอนเลื่อนมาถึง
 * variant: "fade" เฟดขึ้น · "wipe" เปิดรูปจากล่าง · "slide" เปิดจากซ้าย · "none" ไม่ขยับตัวเอง
 * (ใช้ "none" เมื่ออยากให้เฉพาะลูกที่มี .rise / .draw ขยับ)
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "fade",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade" | "wipe" | "slide" | "none";
  /** ใช้ "li" เมื่ออยู่ใน <ol>/<ul> — ห่อ <li> ด้วย <div> ทำให้รายการพัง */
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // ref ของ div กับ li เป็นคนละ type แต่ใช้แค่ observe เลย cast ได้
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      className={`reveal ${className}`}
      data-visible={visible}
      data-variant={variant}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
