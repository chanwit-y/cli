import type { ComponentPropsWithoutRef } from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";
import { type ThemeProps } from "@radix-ui/themes";

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeProps;
  className?: string;
}

export interface TextFieldProps
  extends ComponentPropsWithoutRef<typeof RadixTextField.Root> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  variant?: "classic" | "surface" | "soft";
  size?: "1" | "2" | "3";
  radius?: "none" | "small" | "medium" | "large" | "full";
}
