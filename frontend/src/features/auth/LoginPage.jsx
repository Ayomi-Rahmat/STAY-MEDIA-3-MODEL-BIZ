import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiClock, FiMail, FiStar } from "react-icons/fi";
import AuthSplitLayout from "../../layouts/AuthSplitLayout";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { authApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { isEmail } from "../../utils/validators";
import { SITE } from "../../data/site";

// Left-hand branded panel for the login screen.
function LoginPanel() {
  return (
    <div>
      <h2 className="font-heading text-5xl font-bold leading-tight">
        Welcome <span className="text-accent">Back</span> <span aria-hidden="true">👋</span>
      </h2>
      <p className="mt-5 max-w-sm text-white/75">
        Log in to manage your bookings, view your payment history and reserve your next table,
        room or night out.
      </p>

      <div className="mt-10 grid max-w-sm grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
          <FiClock aria-hidden="true" className="text-accent" />
          <p className="mt-3 text-2xl font-bold">3 in 1</p>
          <p className="text-xs uppercase tracking-wider text-white/60">One account</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
          <FiStar aria-hidden="true" className="text-accent" />
          <p className="mt-3 text-2xl font-bold">4.9 / 5</p>
          <p className="text-xs uppercase tracking-wider text-white/60">2k+ reviews</p>
        </div>
      </div>
    </div>
  );
}

function validate({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // One handler for every field: uses the input's `name` to know which value to update.
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
      const data = await authApi.login({
        email: form.email.trim(),
        password: form.password,
        remember: form.remember,
      });
      login(data);
      navigate(location.state?.from ?? "/", { replace: true });
    } catch (error) {
      setServerError(error.message ?? "Something went wrong. Please try again.");
      setErrors((current) => ({ ...current, ...(error.fieldErrors ?? {}) }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout panel={<LoginPanel />}>
      <h1 className="font-heading text-3xl font-bold">Log in</h1>
      <p className="mt-1.5 text-sm text-gray-500">Continue your journey with {SITE.name}.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
        <Alert type="success">{location.state?.message}</Alert>
        <Alert type="error">{serverError}</Alert>

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

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="login-password" className="text-sm font-medium text-ink">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-medium text-brand hover:underline">
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="login-password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="h-4 w-4 accent-brand"
          />
          Remember me for 30 days
        </label>

        <Button type="submit" loading={loading}>
          {loading ? "Logging in..." : "Login to My Account"}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-brand hover:underline">
          Create one for free
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
