import type { AutocompleteProps2 } from "../@types"
import { AutocompleteBase } from "../Autocomplete"
import { AutocompleteBase2 } from "../Autocomplete2"
import { withForm } from "../hoc/withForm"
export const Autocomplete = withForm(AutocompleteBase as any)
export const AutocompleteF2 = withForm(AutocompleteBase2)
