import type { ComponentPropsWithoutRef, ElementType } from "react";
import {
  TextField as RadixTextField,
  Button as RadixButton,
  Select as RadixSelect,
} from "@radix-ui/themes";
import { type ThemeProps } from "@radix-ui/themes";

export type Components = {
  TextField?: TextFieldProps;
  Button?: ButtonProps;
  SelectField?: SelectFieldProps;
  Textarea?: TextareaProps;
};

export type ThemeContextType = {
  components: Components;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: ThemeProps;
  className?: string;
} & ThemeContextType;

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

export type SelectFieldProps = BaseComponentProps<
  typeof RadixSelect.Trigger,
  {
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    variant?: "classic" | "surface" | "soft";
    size?: "1" | "2" | "3";
    radius?: "none" | "small" | "medium" | "large" | "full";
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    value?: string;
    onValueChange?: (value: string) => void;
  }
>;

export type TextareaProps = BaseComponentProps<
  "textarea",
  {
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";
    autoResize?: boolean;
    maxLength?: number;
    showCharCount?: boolean;
  }
>;
