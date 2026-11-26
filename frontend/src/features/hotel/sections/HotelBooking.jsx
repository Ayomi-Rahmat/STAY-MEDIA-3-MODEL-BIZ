import { useState } from "react";
import { FaArrowLeft, FaCalendarCheck, FaCircleCheck } from "react-icons/fa6";
import SectionHeading from "../../../components/SectionHeading";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import useFormState from "../../../hooks/useFormState";
import { useAuth } from "../../../context/AuthContext";
import { hotelApi } from "../../../services/api";
import { trackEvent } from "../../../utils/analytics";
import { isEmail } from "../../../utils/validators";
import { formatPrice, nightsBetween, prettyDate } from "../../../utils/format";

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter your full name.";
  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) errors.phone = "Enter your phone number.";
  else if (digits.length < 7 || digits.length > 15) errors.phone = "Enter a valid phone number.";
  if (!form.email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(form.email)) errors.email = "Enter a valid email address.";
  if (form.requests.length > 500) errors.requests = "Please keep special requests under 500 characters.";
  return errors;
}

function Summary({ rows }) {
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

// PRD 4.3: online booking + confirmation. Steps: details form -> review -> confirmation (status "Pending confirmation").
//   room + stay come from the page (the room the guest picked and the dates they searched).
export default function HotelBooking({ room, stay, onChangeRoom }) {
  const { user } = useAuth();
  const { form, errors, setErrors, handleChange } = useFormState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    requests: "",
  });
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const total = room ? room.pricePerNight * nights : 0;

  const stayRows = room
    ? [
        ["Room", room.name],
        ["Check-in", prettyDate(stay.checkIn)],
        ["Check-out", prettyDate(stay.checkOut)],
        ["Nights", String(nights)],
        ["Guests", stay.guests],
        ["Price per night", formatPrice(room.pricePerNight)],
        ["Total", formatPrice(total)],
      ]
    : [];
  const guestRows = [
    ["Name", form.name.trim()],
    ["Phone", form.phone.trim()],
    ["Email", form.email.trim()],
    ["Special requests", form.requests.trim() || "None"],
  ];

  const handleReview = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep("review");
  };

  const handleConfirm = async () => {
    setServerError("");
    setLoading(true);
    try {
      const data = await hotelApi.createBooking({
        roomId: room.id,
        checkIn: stay.checkIn,
        checkOut: stay.checkOut,
        guests: stay.guests,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        requests: form.requests.trim(),
      });
      trackEvent("booking_confirmed", { business_unit: "hotel" });
      setConfirmation({ reference: data.reference, email: form.email.trim(), rows: [...stayRows, ...guestRows] });
    } catch (error) {
      setServerError(error.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="scroll-mt-22 bg-sand py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Book Your Stay"
          title={<>Room <span className="text-brand">Booking</span></>}
          subtitle="Tell us who is staying. We will confirm your booking by email."
        />

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
          {confirmation ? (
            <div className="py-6 text-center" role="status">
              <FaCircleCheck aria-hidden="true" className="mx-auto text-5xl text-green-600" />
              <h3 className="mt-5 font-heading text-2xl font-bold">Booking request received!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your reference: <b className="text-ink">{confirmation.reference}</b>
              </p>
              <p className="mt-3 inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                Status: Pending confirmation
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-gray-500">
                We will confirm your room by email at <b className="text-ink">{confirmation.email}</b> shortly.
              </p>
              <div className="mx-auto mt-6 max-w-md">
                <Summary rows={confirmation.rows} />
              </div>
            </div>
          ) : !room ? (
            <div className="py-8 text-center">
              <p className="text-gray-600">Choose your dates and a room above, then your booking form will appear here.</p>
              <a href="#availability" className="mt-4 inline-block font-semibold text-brand hover:underline">Go to date search</a>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Summary rows={stayRows} />
                <button type="button" onClick={onChangeRoom} className="mt-3 text-sm font-semibold text-brand hover:underline">
                  Change room or dates
                </button>
              </div>

              {step === "review" ? (
                <div>
                  <h3 className="font-heading text-2xl font-bold">Review your booking</h3>
                  <p className="mt-1 text-sm text-gray-500">Please check your details before you confirm.</p>
                  <Alert type="error">{serverError}</Alert>
                  <div className="mt-5"><Summary rows={guestRows} /></div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" onClick={() => setStep("form")} disabled={loading} className="rounded-full">
                      <FaArrowLeft aria-hidden="true" /> Edit details
                    </Button>
                    <Button loading={loading} onClick={handleConfirm} className="rounded-full">
                      {!loading && <FaCalendarCheck aria-hidden="true" />}
                      {loading ? "Sending..." : "Confirm Booking"}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReview} noValidate className="space-y-5" aria-label="Guest details">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label="Full Name *" name="name" autoComplete="name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                    <Input label="Phone Number *" name="phone" type="tel" autoComplete="tel" placeholder="+234 803 000 0000" value={form.phone} onChange={handleChange} error={errors.phone} />
                    <Input label="Email Address *" name="email" type="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={handleChange} error={errors.email} className="sm:col-span-2" />
                  </div>
                  <Textarea label="Special Requests" name="requests" placeholder="Late arrival, extra bed, airport pick-up..." value={form.requests} onChange={handleChange} error={errors.requests} />
                  <Button type="submit" className="rounded-full">
                    <FaCalendarCheck aria-hidden="true" /> Review Booking
                  </Button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
