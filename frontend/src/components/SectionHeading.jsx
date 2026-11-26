// The repeating heading block: script "eyebrow" line, big title, gradient underline, optional intro text.
//   <SectionHeading eyebrow="What We Offer" title={<>Browse by <span className="text-brand">Category</span></>} />
// tone="light" is for dark/coloured backgrounds.
export default function SectionHeading({ eyebrow, title, subtitle, tone = "dark", className = "" }) {
  const light = tone === "light";

  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <p className={`font-script text-2xl ${light ? "text-emerald-200" : "text-brand"}`}>{eyebrow}</p>
      <h2 className={`mt-1 font-heading text-4xl font-bold sm:text-[2.6rem] ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-linear-to-r from-brand to-accent" />
      {subtitle && (
        <p className={`mt-5 text-[15px] leading-relaxed ${light ? "text-white/70" : "text-gray-500"}`}>{subtitle}</p>
      )}
    </div>
  );
}
