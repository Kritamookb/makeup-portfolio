"use client";

import { useRef } from "react";
import { finePointer, motionOk } from "@/lib/motion";

/** ปุ่มที่ขยับเข้าหาเมาส์เล็กน้อยตอนชี้ — มือถือและโหมดลดการเคลื่อนไหวจะนิ่งเหมือนปุ่มปกติ */
export default function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (event: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || !finePointer() || !motionOk()) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * strength;
    const y = (event.clientY - box.top - box.height / 2) * strength;
    node.style.transition = "translate 0.2s ease-out";
    node.style.translate = `${x}px ${y}px`;
  };

  const leave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transition = "translate 0.7s var(--ease-silk)";
    node.style.translate = "0 0";
  };

  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
