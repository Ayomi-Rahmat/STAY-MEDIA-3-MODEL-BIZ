import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import { addDays, todayString } from "../../../utils/format";

const GUEST_CHOICES = Array.from({ length: 6 }, (_, index) => ({
  value: String(index + 1),
  label: index === 0 ? "1 guest" : `${index + 1} guests`,
}));

// "When are you staying?" - check-in, check-out, guests. The page keeps the answer (stay) and the result.
//   stay      = { checkIn, checkOut, guests }
//   onChange  = called with the new stay when a field changes
//   onSearch  = called with the stay when the form is valid; returns a promise
export default function AvailabilitySearch({ stay, onChange, onSearch, loading, error, hint }) {
  const [errors, setErrors] = useState({});
  const today = todayString();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...stay, [name]: value };
    // If check-in moves past check-out, push check-out to the next day.
    if (name === "checkIn" && next.checkOut && next.checkOut <= value) next.checkOut = addDays(value, 1);
    setErrors({});
    onChange(next);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = {};
    if (!stay.checkIn) found.checkIn = "Choose your check-in date.";
    else if (stay.checkIn < today) found.checkIn = "Check-in cannot be in the past.";
    if (!stay.checkOut) found.checkOut = "Choose your check-out date.";
    else if (stay.checkIn && stay.checkOut <= stay.checkIn) found.checkOut = "Check-out must be after check-in.";
    setErrors(found);
    if (Object.keys(found).length === 0) onSearch(stay);
  };

  return (
    <section id="availability" className="scroll-mt-22 bg-cream pb-16">
      <div className="container-x">
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Check room availability"
          className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8"
        >
          {hint && <Alert type="info">{hint}</Alert>}
          <Alert type="error">{error}</Alert>
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.7fr_auto]">
            <Input label="Check-in *" name="checkIn" type="date" min={today} value={stay.checkIn} onChange={handleChange} error={errors.checkIn} />
            <Input
              label="Check-out *"
              name="checkOut"
              type="date"
              min={stay.checkIn ? addDays(stay.checkIn, 1) : today}
              value={stay.checkOut}
              onChange={handleChange}
              error={errors.checkOut}
            />
            <Select label="Guests" name="guests" options={GUEST_CHOICES} value={stay.guests} onChange={handleChange} />
            <div className="sm:col-span-2 lg:col-span-1 lg:pt-[1.7rem]">
              <Button type="submit" loading={loading} className="rounded-full lg:w-auto">
                {!loading && <FaMagnifyingGlass aria-hidden="true" />}
                {loading ? "Checking..." : "Check Availability"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
