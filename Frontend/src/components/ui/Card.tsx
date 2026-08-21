import type {
  ReactNode,
} from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border border-gray-200/80
        bg-white/80
        backdrop-blur-sm
        shadow-lg shadow-gray-200/50
        transition-all duration-300
        ${hover ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200/40 hover:border-indigo-200" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}