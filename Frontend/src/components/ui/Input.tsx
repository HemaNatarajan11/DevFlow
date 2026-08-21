import type {
  InputHTMLAttributes,
} from "react";

export default function Input(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`
        w-full rounded-lg
        border border-gray-300
        bg-white px-3 py-2.5
        text-sm
        outline-none
        transition
        placeholder:text-gray-400
        focus:border-indigo-500
        focus:ring-2
        focus:ring-indigo-100
        ${props.className ?? ""}
      `}
    />
  );
}