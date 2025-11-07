import { forwardRef, useCallback, type ElementRef } from "react";
import { Button as RadixButton } from '@radix-ui/themes'
import type { ButtonProps } from "./@types"
import { useFormContext } from "react-hook-form";
import { useCore } from "./core/context";
import { useStord } from "./core/stord";
import Icon from "./Icon";


const Button = forwardRef<ElementRef<typeof RadixButton>, ButtonProps>(({
	label,
	actions,
	api,
	icon,
	onClick,
	...props }) => {

	// const { loadDataTables } = useCore()
	const loadDataTables = useStord((state) => state.loadDataTables)
	const clearCurrentFormSeleted = useStord((state) => state.clearCurrentFormSeleted)
	const { handleSubmit } = useFormContext()

	const handleClieck = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {

		console.log(actions)

		for (const action of actions) {
			switch (action) {
				case 'SubmitFormToPostAPI':
					await handleSubmit(async (data) => {

						console.log(data)
						console.log(api)

						// TODO: check api info
						if (data.id) {
							api && await api({ id: data.id }, { ...data })
						} else {
							api && await api({ ...data })
						}
						// api && await api({  ...data })

					})()
					break;
				case 'ReloadDataTable':
					await loadDataTables["Source Apps"]()
					break;
				case 'ClearCurrentFormSeleted':
					clearCurrentFormSeleted();
				default:
					break;
			}
		}
		onClick && onClick(e)
	}, [actions, handleSubmit])

	return <RadixButton
		className="cursor-pointer"
		onClick={handleClieck}
	>{  icon ? <Icon icon={icon} size={14} /> : ""}
	{label}
	</RadixButton>
})

Button.displayName = 'Button';

export { Button };