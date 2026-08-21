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
        w-full rounded-xl
        border border-gray-200
        bg-white/80 px-3.5 py-2.5
        text-sm text-gray-900
        outline-none
        transition-all duration-200
        placeholder:text-gray-400
        hover:border-gray-300
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-100
        focus:shadow-lg
        focus:shadow-indigo-500/10
        ${props.className ?? ""}
      `}
    />
  );
}