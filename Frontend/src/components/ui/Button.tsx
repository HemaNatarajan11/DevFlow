import type {
  ButtonHTMLAttributes,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost";
}

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98]",
    secondary:
      "bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]",
    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-700 hover:to-rose-700 hover:shadow-xl hover:shadow-red-500/30 active:scale-[0.98]",
    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      className={`
        inline-flex items-center
        justify-center gap-2
        rounded-xl
        px-4 py-2.5 text-sm font-semibold
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-indigo-500
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:transform-none
        ${styles[variant]}
        ${className}
      `}
      {...props}
    />
  );
}