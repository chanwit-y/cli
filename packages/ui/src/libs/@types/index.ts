import type { ComponentPropsWithoutRef, ElementType } from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";
import { type ThemeProps } from "@radix-ui/themes";

export type ThemeContextType = {
  textField?: TextFieldProps;
};

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeProps;
  className?: string;
  textField?: TextFieldProps;
}

export type BaseComponentProps<
  U extends ElementType = ElementType,
  T extends Record<string, any> = {},
> = {
  define?: "TextField";
} & T &
  ComponentPropsWithoutRef<U>;

export type TextFieldProps = BaseComponentProps<
  typeof RadixTextField.Root,
  {
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    variant?: "classic" | "surface" | "soft";
    size?: "1" | "2" | "3";
    radius?: "none" | "small" | "medium" | "large" | "full";
  }
>;
