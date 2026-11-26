import { useState } from "react";
import { FaArrowLeft, FaCalendarCheck, FaCircleCheck, FaClock, FaLocationDot, FaPhone, FaUsers } from "react-icons/fa6";
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
import { GUEST_OPTIONS, SEATING_OPTIONS, TIME_SLOTS } from "../data/content";
import { SITE } from "../data/site";
import { isEmail } from "../utils/validators";
import { todayString } from "../utils/format";

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter your full name.";

  const phoneDigits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) errors.phone = "Enter your phone number.";
  else if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = "Enter a valid phone number.";

  if (!form.email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(form.email)) errors.email = "Enter a valid email address.";

  if (!form.date) errors.date = "Choose a date.";
  else if (form.date < todayString()) errors.date = "Choose today or a future date.";

  if (form.requests.length > 500) errors.requests = "Please keep special requests under 500 characters.";
  return errors;
}

// "2026-12-05" -> "Saturday, 5 December 2026" (read as local time so the day never shifts).
function prettyDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

const labelOf = (options, value) => options.find((option) => option.value === value)?.label ?? value;

// The little table of details shown on the review step and again on the confirmation.
function Summary({ form }) {
  const rows = [
    ["Name", form.name.trim()],
    ["Phone", form.phone.trim()],
    ["Email", form.email.trim()],
    ["Guests", labelOf(GUEST_OPTIONS, form.guests)],
    ["Date", prettyDate(form.date)],
    ["Time", labelOf(TIME_SLOTS, form.time)],
    ["Seating", labelOf(SEATING_OPTIONS, form.seating)],
    ["Special requests", form.requests.trim() || "None"],
  ];
  return (
    <dl className="divide-y divide-gray-100 rounded-2xl bg-sand px-5 text-left text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-6 py-3">
          <dt className="text-gray-500">{label}</dt>
          <dd className="text-right font-semibold text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Reservation() {
  const { user } = useAuth();
  // Logged-in customers get their details filled in for them.
  const { form, errors, setErrors, handleChange, reset } = useFormState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    guests: "1",
    date: "",
    time: "09:00",
    seating: "any",
    requests: "",
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  // Two steps: "form" (fill in) -> "review" (check details) -> confirmation. The submit button on the review step sends it.
  const [step, setStep] = useState("form");

  // Step 1 -> 2: check the form, then show the review screen.
  const handleReview = (event) => {
    event.preventDefault();
    setServerError("");
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStep("review");
  };

  // Step 2 -> done: really send it.
  const handleConfirm = async () => {
    setServerError("");
    setLoading(true);
    try {
      const data = await restaurantApi.createReservation({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        guests: form.guests,
        date: form.date,
        time: form.time,
        category: form.seating,
        requests: form.requests.trim(),
      });
      setConfirmation({ reference: data.reference, email: form.email.trim(), details: { ...form } });
    } catch (error) {
      setServerError(error.message ?? "Something went wrong. Please try again.");
      const fieldErrors = error.fieldErrors ?? {};
      setErrors((current) => ({ ...current, ...fieldErrors }));
      // If the server rejected a field, go back to the form so the person can fix it.
      if (Object.keys(fieldErrors).length > 0) setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const startAgain = () => {
    setConfirmation(null);
    setStep("form");
    reset();
  };

  return (
    <section id="reservation" className="scroll-mt-36 bg-sand py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Book a Table"
          title={
            <>
              Make a <span className="text-brand">Reservation</span>
            </>
          }
          subtitle="Reserve your table for a memorable dining experience. We recommend booking 24 hours in advance for weekend evenings."
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          <aside className="rounded-3xl bg-night p-8 text-white">
            <h3 className="font-heading text-2xl">Contact Info</h3>
            <p className="mt-2 text-sm text-gray-400">We&apos;re happy to help you plan the perfect dining experience.</p>
            <div className="mt-7 space-y-6">
              <InfoItem icon={FaClock} label="Opening Hours">
                {SITE.hours.replace(":", ",")}
              </InfoItem>
              <InfoItem icon={FaPhone} label="Call for Booking">
                {SITE.phone}
              </InfoItem>
              <InfoItem icon={FaUsers} label="Group Dining">
                Special menus for 10+ guests
              </InfoItem>
              <InfoItem icon={FaLocationDot} label="Location">
                {SITE.address}
              </InfoItem>
            </div>
          </aside>

          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
            {confirmation ? (
              <div className="py-8 text-center" role="status">
                <FaCircleCheck aria-hidden="true" className="mx-auto text-5xl text-green-600" />
                <h3 className="mt-5 font-heading text-2xl font-bold">Reservation request received!</h3>
                {confirmation.reference && (
                  <p className="mt-2 text-sm text-gray-500">
                    Your reference: <b className="text-ink">{confirmation.reference}</b>
                  </p>
                )}
                <p className="mt-3 inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                  Status: Pending confirmation
                </p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-gray-500">
                  We&apos;ll confirm your table by email at <b className="text-ink">{confirmation.email}</b> shortly.
                </p>
                <div className="mx-auto mt-6 max-w-md">
                  <Summary form={confirmation.details} />
                </div>
                <Button variant="outline" className="mx-auto mt-7 max-w-xs" onClick={startAgain}>
                  Make another reservation
                </Button>
              </div>
            ) : step === "review" ? (
              <div>
                <h3 className="font-heading text-2xl font-bold">Review your reservation</h3>
                <p className="mt-1 text-sm text-gray-500">Please check everything is correct before you confirm.</p>
                <Alert type="error">{serverError}</Alert>
                <div className="mt-5">
                  <Summary form={form} />
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" onClick={() => setStep("form")} disabled={loading} className="rounded-full">
                    <FaArrowLeft aria-hidden="true" /> Edit details
                  </Button>
                  <Button loading={loading} onClick={handleConfirm} className="rounded-full">
                    {!loading && <FaCalendarCheck aria-hidden="true" />}
                    {loading ? "Sending..." : "Confirm Reservation"}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReview} noValidate className="space-y-5">
                <Alert type="error">{serverError}</Alert>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full Name *"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Input
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    placeholder="+234 803 000 0000"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
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
                  <Select
                    label="Number of Guests *"
                    name="guests"
                    options={GUEST_OPTIONS}
                    value={form.guests}
                    onChange={handleChange}
                  />
                  <Input
                    label="Date *"
                    name="date"
                    type="date"
                    min={todayString()}
                    value={form.date}
                    onChange={handleChange}
                    error={errors.date}
                  />
                  <Select
                    label="Time *"
                    name="time"
                    options={TIME_SLOTS}
                    value={form.time}
                    onChange={handleChange}
                  />
                  <Select
                    label="Seating Preference"
                    name="seating"
                    options={SEATING_OPTIONS}
                    value={form.seating}
                    onChange={handleChange}
                  />
                </div>

                <Textarea
                  label="Special Requests"
                  name="requests"
                  placeholder="Allergies, dietary needs, special occasions..."
                  value={form.requests}
                  onChange={handleChange}
                  error={errors.requests}
                />

                <Button type="submit" className="rounded-full">
                  <FaCalendarCheck aria-hidden="true" /> Review Reservation
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
