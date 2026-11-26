import { useId } from "react";

// A labelled drop-down. `options` is a list of { value, label }.
export default function Select({ label, error, options, className = "", id, ...props }) {
  const autoId = useId();
  const selectId = id || autoId;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink outline-none transition focus:ring-4 ${
          error ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-brand focus:ring-brand/10"
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
