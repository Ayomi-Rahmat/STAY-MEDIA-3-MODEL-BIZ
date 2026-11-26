import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiKey } from "react-icons/fi";
import AuthCardLayout from "../../layouts/AuthCardLayout";
import PasswordInput from "../../components/PasswordInput";
import PasswordStrength from "../../components/PasswordStrength";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { authApi } from "../../services/api";
import { validatePassword } from "../../utils/validators";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetToken } = location.state ?? {};

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Skipped the earlier steps? Send them back to the start.
  if (!email || !resetToken) return <Navigate to="/forgot-password" replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    const found = {};
    const passwordError = validatePassword(form.password);
    if (passwordError) found.password = passwordError;
    if (!form.confirm) found.confirm = "Re-enter your new password.";
    else if (form.confirm !== form.password) found.confirm = "Passwords do not match.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      await authApi.resetPassword({ email, resetToken, password: form.password });
      navigate("/login", {
        replace: true,
        state: { message: "Password updated. You can now log in with your new password." },
      });
    } catch (err) {
      setServerError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardLayout
      icon={FiKey}
      title="Set New Password"
      subtitle="Choose a strong password you haven't used before."
      backTo="/login"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Alert type="error">{serverError}</Alert>

        <div>
          <PasswordInput
            label="New Password"
            name="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <PasswordStrength password={form.password} />
        </div>

        <PasswordInput
          label="Confirm Password"
          name="confirm"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={handleChange}
          error={errors.confirm}
        />

        <Button type="submit" loading={loading}>
          {loading ? "Saving..." : "Update Password"}
        </Button>
      </form>
    </AuthCardLayout>
  );
}
