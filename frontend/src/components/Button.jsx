// One button used everywhere. Change it here and every button on the site updates.
//   variant="primary"  -> solid red (main action)
//   variant="outline"  -> white with border (secondary action)
//   loading            -> shows a spinner and blocks double-clicks
export default function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = true,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

  const variants = {
    primary:
      "bg-linear-to-r from-brand to-brand-dark text-white shadow-lg shadow-brand/25 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-brand/30",
    outline:
      "border border-gray-200 bg-white text-ink hover:border-brand hover:text-brand focus-visible:ring-brand/20",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${fullWidth ? "w-full" : ""} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
