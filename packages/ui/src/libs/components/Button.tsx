import { forwardRef, useCallback, type ElementRef } from "react";
import { Button as RadixButton } from '@radix-ui/themes'
import type { ButtonProps } from "./@types"
import { useFormContext } from "react-hook-form";
import { useCore } from "./core/context";
import { useStord } from "./core/stord";
import Icon from "./Icon";
import { useLoading } from "./context";
import { useSnackbar } from "./Snackbar";


const Button = forwardRef<ElementRef<typeof RadixButton>, ButtonProps>(({
	label,
	actions,
	api,
	icon,
	onClick,
	snackbarSuccess,
	snackbarError,
	...props }) => {

	// const { loadDataTables } = useCore()
	const loadDataTables = useStord((state) => state.loadDataTables)
	const { showSnackbar } = useSnackbar()
	const clearCurrentFormSeleted = useStord((state) => state.clearCurrentFormSeleted)
	const { handleSubmit } = useFormContext()
	const { startLoading, stopLoading } = useLoading()

	const handleClieck = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			console.log(actions)
			let loaderId: string | undefined;

			for (const action of actions) {
				switch (action) {
					case 'SubmitFormToPostAPI':
						console.log('2')
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
						console.log('3')
						await loadDataTables["Source Apps"]()
						break;
					case 'ClearCurrentFormSeleted':
						clearCurrentFormSeleted();
						break;
					case 'StratLoading':
						console.log('1')
						loaderId = startLoading();
						break;
					case 'StopLoading':
						console.log('4')
						loaderId && stopLoading(loaderId);
						break;
					default:
						break;
				}
			}
			onClick && onClick(e)
			if (snackbarSuccess) {
				showSnackbar({
					variant: snackbarSuccess.type,
					message: snackbarSuccess.message,
				})
			}
		} catch (err) {
			if (snackbarError === "$exception") {
				showSnackbar({
					variant: "error",
					message: "An error occurred",
				})
			}
		}

	}, [actions, handleSubmit])

	return <RadixButton
		className="cursor-pointer"
		onClick={handleClieck}
	>{icon ? <Icon icon={icon} size={14} /> : ""}
		{label}
	</RadixButton>
})

Button.displayName = 'Button';

export { Button };