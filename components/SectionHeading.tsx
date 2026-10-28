/**
 * หัวข้อหมวด — ต้องอยู่ใน <Reveal> เพราะหัวข้อ/เส้นใต้ขยับตามสถานะของ Reveal
 * index: เลขบทแบบนิตยสาร เช่น "02" (ไม่ใส่ก็ได้)
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  index,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  index?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {index ? (
          <>
            <span className="font-display text-base tracking-normal text-rose italic">{index}</span>
            <span aria-hidden="true" className="draw block h-px w-8 bg-rose/60" />
          </>
        ) : null}
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-[2.1rem] leading-[1.1] font-light text-ink sm:text-5xl md:text-[3.4rem]">
        <span className="rise-wrap">
          <span className="rise">{title}</span>
        </span>
      </h2>
      {lead ? (
        <p className={`mt-6 text-base leading-relaxed text-muted ${centered ? "" : "max-w-xl"}`}>{lead}</p>
      ) : null}
    </div>
  );
}
