import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import Input from "./Input";

// Same as Input, but with a lock icon and a show/hide eye button.
export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      icon={FiLock}
      type={visible ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="mr-3 rounded p-1 text-gray-400 transition hover:text-brand"
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      }
      {...props}
    />
  );
}
