import { useId } from "react";

// A labelled text field with optional icon, text prefix (e.g. "+234"),
// right-hand slot (used by the password eye) and an error message.
// Any normal <input> prop (name, type, value, onChange, placeholder...) passes straight through.
export default function Input({
  label,
  error,
  icon: Icon,
  prefix,
  rightSlot,
  className = "",
  id,
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded-xl border bg-white transition focus-within:ring-4 ${
          error
            ? "border-red-400 focus-within:ring-red-100"
            : "border-gray-200 focus-within:border-brand focus-within:ring-brand/10"
        }`}
      >
        {prefix && (
          <span className="flex items-center self-stretch rounded-l-xl border-r border-gray-200 bg-cream px-4 text-sm text-gray-500">
            {prefix}
          </span>
        )}
        {Icon && <Icon aria-hidden="true" className="ml-4 shrink-0 text-gray-400" />}
        <input
          id={inputId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-ink outline-none placeholder:text-gray-400"
          {...props}
        />
        {rightSlot}
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
