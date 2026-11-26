import { passwordStrength } from "../utils/validators";

// Four small bars that fill up as the password gets stronger.
const COLORS = ["bg-gray-200", "bg-red-500", "bg-amber-400", "bg-lime-500", "bg-green-600"];

export default function PasswordStrength({ password }) {
  const { score, label } = passwordStrength(password);

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={`h-1.5 flex-1 rounded-full transition-colors ${score >= bar ? COLORS[score] : "bg-gray-200"}`}
          />
        ))}
      </div>
      {label && <p className="mt-1 text-right text-xs text-gray-400">{label} strength</p>}
    </div>
  );
}
