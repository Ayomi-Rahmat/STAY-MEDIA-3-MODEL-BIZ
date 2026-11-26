import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import AuthCardLayout from "../../layouts/AuthCardLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { authApi } from "../../services/api";
import { isEmail } from "../../utils/validators";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!email.trim()) return setError("Enter your email address.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    setError("");

    setLoading(true);
    try {
      await authApi.forgotPassword({ email: email.trim() });
      // Carry the email to the next screen through router state (not the URL).
      navigate("/verify-otp", { state: { email: email.trim() } });
    } catch (err) {
      setServerError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardLayout
      icon={FiLock}
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a 4-digit code to reset your password."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Alert type="error">{serverError}</Alert>
        <Input
          label="Email Address"
          type="email"
          icon={FiMail}
          placeholder="e.g. you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={error}
        />
        <Button type="submit" loading={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </AuthCardLayout>
  );
}
