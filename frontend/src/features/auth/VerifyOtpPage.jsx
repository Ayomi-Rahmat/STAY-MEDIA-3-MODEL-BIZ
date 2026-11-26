import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import AuthCardLayout from "../../layouts/AuthCardLayout";
import OtpInput from "../../components/OtpInput";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { authApi } from "../../services/api";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  // Countdown for the "Resend code" button.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // Opened this page directly (e.g. page refresh)? We don't know the email, so start over.
  if (!email) return <Navigate to="/forgot-password" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInfo("");

    if (otp.length < OTP_LENGTH) return setError(`Enter the ${OTP_LENGTH}-digit code.`);
    setError("");

    setLoading(true);
    try {
      const data = await authApi.verifyOtp({ email, otp });
      navigate("/reset-password", { state: { email, resetToken: data.resetToken } });
    } catch (err) {
      setError(err.message ?? "Something went wrong. Please try again.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await authApi.forgotPassword({ email });
      setInfo("A new code has been sent to your email.");
      setOtp("");
      setSecondsLeft(RESEND_SECONDS);
    } catch (err) {
      setError(err.message ?? "Could not resend the code. Please try again.");
    }
  };

  return (
    <AuthCardLayout
      icon={FiShield}
      title="Enter OTP"
      subtitle={`Enter the ${OTP_LENGTH}-digit code we sent to ${email} to reset your password.`}
      backTo="/forgot-password"
      backLabel="Back"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Alert type="success">{info}</Alert>
        <Alert type="error">{error}</Alert>

        <div>
          <p className="mb-3 text-center text-sm font-medium">OTP Code</p>
          <OtpInput length={OTP_LENGTH} value={otp} onChange={(v) => { setOtp(v); setError(""); }} hasError={Boolean(error)} disabled={loading} />
        </div>

        <Button type="submit" loading={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Didn&apos;t get a code?{" "}
        {secondsLeft > 0 ? (
          <span>Resend in {secondsLeft}s</span>
        ) : (
          <button type="button" onClick={handleResend} className="font-semibold text-brand hover:underline">
            Resend code
          </button>
        )}
      </p>
      <p className="mt-2 text-center text-sm text-gray-500">
        <Link to="/login" className="hover:text-brand">
          Remembered it? Log in
        </Link>
      </p>
    </AuthCardLayout>
  );
}
