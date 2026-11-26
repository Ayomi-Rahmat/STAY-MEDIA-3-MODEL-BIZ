import { useCallback, useRef, useState } from "react";

// Keeps a form's values and errors together so each form doesn't repeat the same code.
//   const { form, errors, setErrors, handleChange, reset } = useFormState({ name: "", email: "" });
// Give every input a `name` matching a key, plus  value={form.name} onChange={handleChange}.
export default function useFormState(initialValues) {
  const initialRef = useRef(initialValues);
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined })); // clear that field's error as they fix it
  }, []);

  const reset = useCallback(() => {
    setForm(initialRef.current);
    setErrors({});
  }, []);

  return { form, errors, setErrors, handleChange, reset };
}
