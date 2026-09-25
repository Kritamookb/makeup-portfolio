export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight font-light text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      <span
        className={`mt-5 block h-px w-16 bg-rose/60 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {lead ? <p className="mt-5 text-base leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}
