import { useId } from "react";

// A labelled multi-line text box.
export default function Textarea({ label, error, className = "", id, rows = 4, ...props }) {
  const autoId = useId();
  const textareaId = id || autoId;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full resize-y rounded-xl border bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-gray-400 focus:ring-4 ${
          error ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-brand focus:ring-brand/10"
        }`}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
