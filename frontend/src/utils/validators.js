// Small, readable validation helpers. Each one answers a yes/no question
// or returns an error message ("" means the value is fine).

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

// Strips spaces/dashes and a leading 0 so "0803 123 4567" and "803 123 4567"
// both become "8031234567".
export const normalizePhone = (value) => value.replace(/\D/g, "").replace(/^0/, "");

export const isValidPhone = (value) => /^\d{10}$/.test(normalizePhone(value));

// Returns a score from 0 (empty) to 4 (strong) plus a label for the UI.
export function passwordStrength(password) {
  if (!password) return { score: 0, label: "" };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ["Weak", "Weak", "Medium", "Good", "Strong"];
  return { score: Math.max(score, 1), label: labels[score] };
}

// The minimum rule we enforce: 8+ characters with at least one letter and one number.
export function validatePassword(password) {
  if (!password) return "Enter a password.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Use at least one letter and one number.";
  }
  return "";
}
