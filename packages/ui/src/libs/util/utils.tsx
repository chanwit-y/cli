import { type ClassValue, clsx } from "clsx"
import { forwardRef, type ForwardedRef, type ForwardRefExoticComponent, type JSX } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
