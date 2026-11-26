import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCalendar, FiBell, FiMail, FiPhone, FiLayers, FiUser } from "react-icons/fi";
import AuthSplitLayout from "../layouts/AuthSplitLayout";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import PasswordStrength from "../components/PasswordStrength";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { authApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { isEmail, isValidPhone, normalizePhone, validatePassword } from "../utils/validators";
import { SITE } from "../data/site";

const BENEFITS = [
  { icon: FiLayers, title: "One Account", text: "Use the same login for the restaurant, hotel and club." },
  { icon: FiBell, title: "Stay Updated", text: "Get booking confirmations and updates straight to your account." },
  { icon: FiCalendar, title: "Easy Reservations", text: "Book a table and manage every booking in one place." },
];

function RegisterPanel() {
  return (
    <div>
      <h2 className="font-heading text-4xl font-bold leading-tight">
        Join the <span className="text-accent">{SITE.name}</span> family
      </h2>
      <p className="mt-4 max-w-sm text-white/75">
        Create your free account and make every booking effortless.
      </p>

      <ul className="mt-9 max-w-sm space-y-6">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-accent ring-1 ring-white/15">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-white/65">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function validate({ name, email, phone, password, agree }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Enter your full name.";
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (!phone.trim()) errors.phone = "Enter your phone number.";
  else if (!isValidPhone(phone)) errors.phone = "Enter a valid 10-digit phone number.";
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  if (!agree) errors.agree = "You must agree to the Terms of Service and Privacy Policy.";
  return errors;
}

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", agree: false });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      const data = await authApi.register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: `+234${normalizePhone(form.phone)}`,
        password: form.password,
      });
      login(data); // registering also logs the customer in
      navigate("/", { replace: true });
    } catch (error) {
      setServerError(error.message ?? "Something went wrong. Please try again.");
      setErrors((current) => ({ ...current, ...(error.fieldErrors ?? {}) }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout panel={<RegisterPanel />}>
      <h1 className="font-heading text-3xl font-bold">Create Your Account</h1>
      <p className="mt-1.5 text-sm text-gray-500">
        Already a member?{" "}
        <Link to="/login" className="font-semibold text-brand hover:underline">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
        <Alert type="error">{serverError}</Alert>

        <Input
          label="Full Name"
          name="name"
          icon={FiUser}
          placeholder="Enter your name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          icon={FiMail}
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          inputMode="tel"
          prefix="+234"
          icon={FiPhone}
          placeholder="800 000 0000"
          autoComplete="tel-national"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <div>
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <PasswordStrength password={form.password} />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 accent-brand"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" target="_blank" className="font-medium text-brand hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" target="_blank" className="font-medium text-brand hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agree && (
            <p role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.agree}
            </p>
          )}
        </div>

        <Button type="submit" loading={loading}>
          {loading ? "Creating account..." : "Create My Account"}
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
