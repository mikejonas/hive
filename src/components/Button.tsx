// src/components/Button.tsx

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  href,
  variant = "primary",
  className = "",
  children,
}) => {
  const baseStyles =
    "rounded-full flex items-center justify-center gap-2 transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 font-medium";

  const variantStyles = {
    primary:
      "bg-gray-200 dark:bg-gray-100 text-black hover:bg-gray-300 dark:hover:bg-gray-300",
    secondary:
      "border border-gray-500 text-white hover:bg-gray-800 dark:hover:bg-gray-700",
  };

  const combinedClasses = cn(baseStyles, variantStyles[variant], className);

  return href ? (
    <a href={href} className={combinedClasses}>
      {children}
    </a>
  ) : (
    <button className={combinedClasses}>{children}</button>
  );
};

export default Button;
