// A small message bar. type="error" (red), "success" (green) or "info" (amber).
export default function Alert({ type = "error", children }) {
  if (!children) return null;

  const STYLES = {
    success: "border-green-200 bg-green-50 text-green-700",
    info: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-red-200 bg-red-50 text-red-600",
  };
  const styles = STYLES[type] ?? STYLES.error;

  return (
    <div role={type === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}
