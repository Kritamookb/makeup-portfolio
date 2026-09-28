"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * หน้าเว็บเป็น static — ปีที่ render ตอน build จะค้างไว้ตลอด
 * ใช้ปีตอน build ระหว่าง hydrate แล้วให้เบราว์เซอร์เปลี่ยนเป็นปีปัจจุบัน
 */
export default function CurrentYear({ initial }: { initial: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => initial,
  );

  return <>{year}</>;
}
