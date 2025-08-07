import type { ComponentPropsWithoutRef, ElementType } from "react";
import {
  TextField as RadixTextField,
  Button as RadixButton,
} from "@radix-ui/themes";
import { type ThemeProps } from "@radix-ui/themes";

export type ThemeContextType = {
  textField?: TextFieldProps;
  button?: ButtonProps;
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
> = T & ComponentPropsWithoutRef<U>;

export type ButtonProps = BaseComponentProps<
  typeof RadixButton,
  {
    variant?: "solid" | "outline" | "ghost" | "link";
  }
>;

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
