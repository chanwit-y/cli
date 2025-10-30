import type { ComponentPropsWithoutRef, ElementType, JSX } from "react";
import {
  TextField as RadixTextField,
  Button as RadixButton,
  Select as RadixSelect,
  Checkbox as RadixCheckbox,
  RadioGroup as RadixRadioGroup,
} from "@radix-ui/themes";
import { type ThemeProps } from "@radix-ui/themes";
import type { ReactNode } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { IconData } from "../core/const/iconData";
import type {
  FieldArrayPath,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import type { Button } from "../core/button";

export type Components = {
  TextField?: TextFieldProps;
  Button?: ButtonProps;
  SelectField?: SelectFieldProps;
  Autocomplete?: AutocompleteProps;
  Textarea?: TextareaProps;
  Checkbox?: CheckboxProps;
  RadioButton?: RadioButtonProps;
  Popover?: PopoverProps;
  Icon?: IconProps;
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
    label: string;
    icon?: keyof typeof IconData;
    actions: ButtonAction[];
    api?: APIFunction;
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
    isFullWidth?: boolean;
    width?: number;
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

export type AutocompleteProps = BaseComponentProps<
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

export type APIFunction = (
  query?: Record<string, any>,
  params?: Record<string, any>,
  body?: Record<string, any>
) => Promise<any>;

export type AutocompleteProps2<T extends Record<string, any> = {}> =
  BaseComponentProps<
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
      observeTo?: string;
      // apiSubject?: Subject<string>;
      // api?: (params: Record<string, any>) => Observable<T[]>;
      // apiCanSearch?: boolean;
      api?: APIFunction;
      apiInfo?: API;
      enabledWhen?: ConditionTerm;
      // defaultData?: Record<string, unknown>;
      // apiObserveParam?: string;
    }
  >;

export type MultiAutocompleteProps<T extends Record<string, any> = {}> =
  BaseComponentProps<
    "button",
    {
      name?: string;
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
      values?: string[];
      onValuesChange?: (values: string[]) => void;
      onChange?: (values: string[]) => void;
      onBlur?: () => void;
      maxResults?: number;
      canObserve?: boolean;
      observeTo?: string;
      api?: APIFunction;
      apiInfo?: API;
      maxSelections?: number;
      showSelectedCount?: boolean;
      fields?: any[];
      append?: UseFieldArrayAppend<any, FieldArrayPath<any>>;
      remove?: UseFieldArrayRemove;
    }
  >;

export type DataTableProps = {
  columns?: any[];
  title?: string;
  canSearchAllColumns?: boolean;
  api?: APIFunction;
  apiInfo?: API;
  // apiEdit?: APIFunction;
};

export type PopoverProps = BaseComponentProps<
  "div",
  {
    children: ReactNode;
    content: ReactNode;
    trigger?: "click" | "hover";
    placement?:
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "top-start"
      | "top-end"
      | "bottom-start"
      | "bottom-end";
    offset?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    contentClassName?: string;
    disabled?: boolean;
  }
>;

export type IconProps = BaseComponentProps<
  "span",
  {
    icon: LucideIcon;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    className?: string;
  } & Omit<LucideProps, "size" | "color" | "strokeWidth">
>;

export type DataValue = {
  type: "variable" | "state" | "observe" | "value";
  key: "none" | string;
  value?: any;
};

export type API = {
  name: string;
  paths?: string[];
  query?: Record<string, DataValue>;
  params?: Record<string, DataValue>;
  body?: Record<string, DataValue>;
};

export type Term = {
  type: "observe" | "value";
  name?: string;
  value?: unknown;
};

export type Operator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "and"
  | "or";

export type ConditionTerm = {
  left: Term;
  operator: Operator;
  right: Term;
};

export type CheckboxElement = {
  name: string;
  dataType: string;
  isRequired: boolean;
  errorMessage: string;
} & CheckboxProps;

export type AutocompleteElement = {
  name: string;
  dataType: string;
  label: string;
  canObserve: boolean;
  observeTo: string;
  enabledWhen: ConditionTerm;
  isRequired: boolean;
  errorMessage: string;
  api?: API & {
    // observeParam: string;
    // canSearch: boolean;
  };
  keys: {
    id: any;
    search: any;
    display: any;
  };
  defaultData: Record<string, unknown>;
  options: any[];
};

export type ColumnDef = {
  accessor: string;
  header: string;
  enableSorting: boolean;
  enableColumnFilter: boolean;
  isEditable?: boolean;
};

export type DataTableElement = {
  name: string;
  title: string;
  columns: ColumnDef[];
  api: API & {};
  // Editing: {}
};

// export type TextFieldElement = {};

export type TextFieldElement = {
  name: string;
  dataType: string;
  isRequired: boolean;
  errorMessage: string;
} & TextFieldProps;

export type TElement =
  | AutocompleteElement
  | TextFieldElement
  | DataTableElement
  | ModalElement
  | ButtonElement;

export type BinType =
  | "multiAutocomplete"
  | "modal"
  | "button"
  | "datatable"
  | "autocomplete"
  | "textfield"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea"
  | "container"
  | "empty";

type BoxRange =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";
export type Bin = {
  sm: BoxRange;
  md: BoxRange;
  lg: BoxRange;
  xl: BoxRange;
  type: BinType;
  element?: TElement;
  container?: Container;
};

export type Container = {
  id: string;
  name: string;
  isAaary: boolean;
  bins: Bin[];
};

export type ButtonAction = "OpenModal" | "SubmitFormToAPI" | "ReloadDataTable";

export type ButtonElement = {
  label: string;
  icon?: keyof typeof IconData;
  actions: ButtonAction[];
  api?: API & {};
};

export type ModalElement = {
  id: string;
  title: string;
  description?: string;
  container: Container;
  trigger: ButtonElement;
  maxWidth: string;
};

export type Modals = Record<string, ModalElement>;

export type Page = {
  name: string;
  containers: Container[];
};

export type FnAPI = FnAPI1 | FnAPI2 | FnAPI3 | FnAPI4;

export type FnAPI1 = () => Promise<any>;

export type FnAPI2 = (query: Record<string, any>) => Promise<any>;

export type FnAPI3 = (params: Record<string, any>) => Promise<any>;

export type FnAPI4 = (
  query: Record<string, any>,
  params: Record<string, any>
) => Promise<any>;
export interface IElement {
  // setAPI(api: APIFunction): void;
  // setForm(form: any): void;
  create(): JSX.Element;
}
