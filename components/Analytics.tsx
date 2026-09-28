"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * ดักคลิกที่ระดับ document แทนการใส่ onClick ทีละปุ่ม
 * — ปุ่มติดต่ออยู่กระจายหลาย section และส่วนใหญ่เป็น server component
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      // แถบล่างจอมือถือใส่ data-location ไว้ ส่วนที่เหลือใช้ id ของ section / header / footer
      const area = link.closest<HTMLElement>("[data-location], section[id], header, footer");
      const location = area?.dataset.location || area?.id || area?.tagName.toLowerCase() || "page";

      if (href.startsWith("tel:")) track("contact_phone", { location });
      else if (href.includes("line.me") || href.includes("lin.ee")) track("contact_line", { location });
      else if (href.startsWith("mailto:")) track("contact_email", { location });
      else if (href.includes("instagram.com")) track("contact_instagram", { location });
      else if (href.includes("facebook.com")) track("contact_facebook", { location });
      else if (href === "#booking") track("booking_cta", { location });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
