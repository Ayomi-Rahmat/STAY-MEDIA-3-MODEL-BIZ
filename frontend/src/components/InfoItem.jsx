// An icon in a small square, with a label above a value.
// Used in the reservation card, the contact card and the footer (same look, different text sizes).
export default function InfoItem({ icon: Icon, label, children, compact = false }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/20 text-sm text-brand">
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p
          className={
            compact
              ? "text-sm font-semibold text-gray-200"
              : "text-[11px] font-semibold uppercase tracking-widest text-gray-400"
          }
        >
          {label}
        </p>
        <p className={compact ? "mt-0.5 text-sm text-gray-400" : "mt-0.5 text-[15px] text-white"}>{children}</p>
      </div>
    </div>
  );
}
