import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaClock, FaEnvelope, FaLocationDot, FaPaperPlane, FaPhone } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading";
import InfoItem from "../components/InfoItem";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Alert from "../components/Alert";
import useFormState from "../hooks/useFormState";
import { useAuth } from "../context/AuthContext";
import { restaurantApi } from "../services/api";
import { trackEvent } from "../utils/analytics";
import { SUBJECT_OPTIONS } from "../data/content";
import { SITE } from "../data/site";
import { SOCIALS } from "../data/socials";
import { isEmail } from "../utils/validators";

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter your name.";
  if (!form.email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(form.email)) errors.email = "Enter a valid email address.";
  if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
  if (form.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

// withHeading={false} lets the Contact PAGE show its own page title instead.
// The address can pick the subject: /contact?subject=accommodation
export default function Contact({ withHeading = true }) {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const wanted = params.get("subject");
  const initialSubject = SUBJECT_OPTIONS.some((option) => option.value === wanted) ? wanted : "general";
  const { form, errors, setErrors, handleChange, reset } = useFormState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    subject: initialSubject,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setSent(false);

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      await restaurantApi.sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      trackEvent("enquiry_sent", { subject: form.subject });
      setSent(true);
      reset();
    } catch (error) {
      setServerError(error.message ?? "Something went wrong. Please try again.");
      setErrors((current) => ({ ...current, ...(error.fieldErrors ?? {}) }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-22 bg-white py-16">
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            eyebrow="Get In Touch"
            title={
              <>
                Contact <span className="text-brand">Us</span>
              </>
            }
            subtitle="Have a question, feedback, or want to plan a special event? We'd love to hear from you."
          />
        )}

        <div className={`${withHeading ? "mt-12" : ""} grid items-start gap-6 lg:grid-cols-[0.85fr_1.4fr]`}>
          <aside className="rounded-3xl bg-night p-8 text-white">
            <h3 className="font-heading text-2xl">Let&apos;s Talk</h3>
            <p className="mt-2 text-sm text-gray-400">We typically respond within 2 hours during business hours.</p>
            <div className="mt-7 space-y-6">
              <InfoItem icon={FaLocationDot} label="Address">
                {SITE.fullAddress}
              </InfoItem>
              <InfoItem icon={FaPhone} label="Phone">
                {SITE.phone}
              </InfoItem>
              <InfoItem icon={FaEnvelope} label="Email">
                {SITE.email}
              </InfoItem>
              <InfoItem icon={FaClock} label="Restaurant Hours">
                {SITE.hours}
              </InfoItem>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-sm text-gray-300 transition hover:bg-brand hover:text-white"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-8"
          >
            {sent && <Alert type="success">Thank you! Your message has been sent. We&apos;ll reply soon.</Alert>}
            <Alert type="error">{serverError}</Alert>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Your Name *"
                name="name"
                placeholder="John Doe"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                label="Email Address *"
                name="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+234 803 000 0000"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <Select
                label="Subject *"
                name="subject"
                options={SUBJECT_OPTIONS}
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <Textarea
              label="Message *"
              name="message"
              rows={6}
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              error={errors.message}
            />

            <Button type="submit" loading={loading} fullWidth={false} className="rounded-full px-8">
              {!loading && <FaPaperPlane aria-hidden="true" />}
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
