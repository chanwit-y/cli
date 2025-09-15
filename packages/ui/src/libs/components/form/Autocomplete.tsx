import { Autocomplete as AutocompleteWithTheme } from "../Autocomplete"
import { Autocomplete2 } from "../Autocomplete2"
import { withForm } from "../hoc/withForm"

export const Autocomplete = withForm(AutocompleteWithTheme)
export const AutocompleteF2 = withForm(Autocomplete2)
