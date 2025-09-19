import type { ComponentPropsWithoutRef, ElementType } from "react";
import {
  TextField as RadixTextField,
  Button as RadixButton,
  Select as RadixSelect,
  Checkbox as RadixCheckbox,
  RadioGroup as RadixRadioGroup,
} from "@radix-ui/themes";
import { type ThemeProps } from "@radix-ui/themes";
import type { Observable, Subject } from "rxjs";

export type Components = {
  TextField?: TextFieldProps;
  Button?: ButtonProps;
  SelectField?: SelectFieldProps;
  Autocomplete?: AutocompleteProps;
  Textarea?: TextareaProps;
  Checkbox?: CheckboxProps;
  RadioButton?: RadioButtonProps;
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

export type CheckboxProps = BaseComponentProps<
  typeof RadixCheckbox,
  {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    size?: "1" | "2" | "3";
    variant?: "classic" | "surface" | "soft";
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    indeterminate?: boolean;
  }
>;

export type RadioButtonProps = BaseComponentProps<
  typeof RadixRadioGroup.Root,
  {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    size?: "1" | "2" | "3";
    variant?: "classic" | "surface" | "soft";
    value?: string;
    onValueChange?: (value: string) => void;
    options: Array<{ 
      value: string; 
      label: string; 
      disabled?: boolean;
      helperText?: string;
    }>;
    orientation?: "horizontal" | "vertical";
  }
>;

export type AutocompleteItem = {
  id: string;
  label: string;
  category: string;
  disabled?: boolean;
};


export type AutocompleteItem2 = {
  id: string;
  label: string;
};

export type AutocompleteProps= BaseComponentProps<
  "button",
  {
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    variant?: "classic" | "surface" | "soft";
    size?: "1" | "2" | "3";
    radius?: "none" | "small" | "medium" | "large" | "full";
    items: AutocompleteItem[];
    value?: string;
    onValueChange?: (value: string) => void;
    onBlur?: () => void;
    maxResults?: number;
  }
>;



export type AutocompleteProps2<T extends Record<string, any> = {}> = BaseComponentProps<
  "button",
  {
    // name?: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    variant?: "classic" | "surface" | "soft";
    size?: "1" | "2" | "3";
    radius?: "none" | "small" | "medium" | "large" | "full";
    options: T[];
    searchKey: keyof T;
    idKey: keyof T;
    displayKey: keyof T;
    value?: string;
    onValueChange?: (value: string) => void;
    onBlur?: () => void;
    maxResults?: number;
    canObserve?: boolean;
    observeKey?: string;
    apiSubject?: Subject<string>;
    api?: (params?: {query: Record<string, any>, params: Record<string, any>}) => Observable<T[]>;
  }
>;



export type AutocompleteElement = {
	name: string;
	api: {
		nmae: string;
		params: Record<string, any>;
	}
	keys: {
		id: string;
		search: string;
		display: string;
	}
}  


export type TextFieldElement = {

}


type BoxRange = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
export type Box = {
	sm: BoxRange;
	md: BoxRange;
	lg: BoxRange;
	xl: BoxRange;
	element?: AutocompleteElement | TextFieldElement;
}