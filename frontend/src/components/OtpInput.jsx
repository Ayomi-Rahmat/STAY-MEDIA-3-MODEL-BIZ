import { useRef } from "react";

// Row of single-digit boxes for the verification code.
// `value` is a plain string like "12" and `onChange` receives the new string,
// so the parent page only ever deals with one simple value.
export default function OtpInput({ length = 4, value, onChange, disabled = false, hasError = false }) {
  const refs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusBox = (index) => {
    const box = refs.current[Math.max(0, Math.min(index, length - 1))];
    box?.focus();
    box?.select();
  };

  const handleChange = (index, event) => {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    // Never leave a gap: type into the first empty box at most.
    const position = Math.min(index, value.length);
    const next = (value.slice(0, position) + digit + value.slice(position + 1)).slice(0, length);
    onChange(next);
    focusBox(position + 1);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]) {
        onChange(value.slice(0, index) + value.slice(index + 1));
      } else if (index > 0) {
        onChange(value.slice(0, index - 1) + value.slice(index));
        focusBox(index - 1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusBox(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusBox(index + 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    focusBox(pasted.length);
  };

  return (
    <div className="flex justify-center gap-3" role="group" aria-label="Verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (refs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1} of ${length}`}
          disabled={disabled}
          className={`h-14 w-14 rounded-xl border bg-white text-center text-xl font-semibold text-ink outline-none transition focus:ring-4 ${
            hasError
              ? "border-red-400 focus:ring-red-100"
              : "border-gray-200 focus:border-brand focus:ring-brand/10"
          }`}
        />
      ))}
    </div>
  );
}
