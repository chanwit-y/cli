import { forwardRef, useCallback, type ElementRef } from "react";
import { Button as RadixButton } from '@radix-ui/themes'
import type { ButtonProps } from "./@types"
import { useFormContext } from "react-hook-form";
import { useCore } from "./core/context";
import { useStord } from "./core/stord";


const Button = forwardRef<ElementRef<typeof RadixButton>, ButtonProps>(({
	label,
	actions,
	...props }) => {

	// const { loadDataTables } = useCore()
	const loadDataTables = useStord((state) => state.loadDataTables)
	const { handleSubmit } = useFormContext()

	const handleClieck = useCallback(async () => {

	console.log(actions)	

		for (const action of actions) {
			switch (action) {
				case 'SubmitFormToAPI':
					handleSubmit(async (data) => {

							console.log(data)

					})()
					break;
				case 'ReloadDataTable':
					await loadDataTables["Source Apps"]()
					break;
				default:
					break;
			}
		}
	}, [actions, handleSubmit])

	return <RadixButton
		onClick={handleClieck}
	>{label}</RadixButton>
})

Button.displayName = 'Button';

export { Button };