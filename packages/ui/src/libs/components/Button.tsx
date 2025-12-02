import { forwardRef, useCallback, useState, type ElementRef } from "react";
import { Button as RadixButton } from '@radix-ui/themes'
import type { ButtonAction, ButtonProps, ConfirmBoxElement } from "./@types"
import { useFormContext } from "react-hook-form";
import { useStord } from "./core/stord";
import Icon from "./Icon";
import { useLoading } from "./context";
import { useSnackbar } from "./Snackbar";
import { ConfirmBox } from "./ConfirmBox";




const Button = forwardRef<ElementRef<typeof RadixButton>, ButtonProps>(({
	label,
	actions,
	api,
	icon,
	onClick,
	snackbarSuccess,
	snackbarError,
	confirmBox,
	reloadDataTable,
	...props }) => {

	// const { loadDataTables } = useCore()
	const fnCtxs = useStord((state) => state.fnCtxs)
	const { showSnackbar } = useSnackbar()
	const clearCurrentFormSeleted = useStord((state) => state.clearCurrentFormSeleted)
	const { handleSubmit } = useFormContext()
	const { startLoading, stopLoading } = useLoading()

	const [open, setOpen] = useState(false)

	const handleConfirm = useCallback((isConfirm: boolean) => {
		if (isConfirm) {
			executeActions(confirmBox?.True || [])
		} else {
			executeActions(confirmBox?.False || [])
		}
	}, [])

	const executeActions = useCallback(async (
		actionsToExecute: ButtonAction[] = [],
		event?: React.MouseEvent<HTMLButtonElement>
	) => {
		let loaderId: string | undefined;
		// const fnCtxs = useStord((state) => state.fnCtxs)

		try {
			for (const action of actionsToExecute) {
				switch (action) {
					case 'SubmitFormToPostAPI':
					case 'SubmitFormToPatchAPI':
						console.log('2')
						await handleSubmit(async (data) => {
							// TODO: check api info
							console.log('data', data)
							if (data.id || data._id) {
								console.log('action')
								api && await api({ id: data.id || data._id }, { ...data })
							} else {
								api && await api({ ...data })
							}


							reloadDataTable && await fnCtxs[reloadDataTable]()
						})()
						break;
					// case 'ReloadDataTable':
					// 	console.log('3')
					// 	// Change to table name
					// 	await fnCtxs["Companies"]()
					// 	break;
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
					case 'CloseModal':
						console.log('5')
						fnCtxs["modal"]?.(false)
						fnCtxs["modalDatable"]?.(false)
						break;
					default:
						break;
				}
			}

			if (event && onClick) {
				onClick(event);
			}


			// console.log('reloadDataTable', reloadDataTable)

			if (snackbarSuccess) {
				showSnackbar({
					variant: snackbarSuccess.type,
					message: snackbarSuccess.message,
				})
			}
		} catch (err) {
			loaderId && stopLoading(loaderId);
			// throw err;
			if (snackbarError === "$exception") {
				showSnackbar({
					variant: "error",
					message: "An error occurred",
				})
			}
		}

	}, [api, clearCurrentFormSeleted, handleSubmit, fnCtxs, onClick, showSnackbar, snackbarSuccess, startLoading, stopLoading, reloadDataTable])

	const handleClieck = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
		let [a1] = actions || []

		if (a1 === "ConfirmBox") {
			setOpen(true)
			return;
		}

		await executeActions(actions, e)
	

	}, [actions, executeActions, onClick, showSnackbar, snackbarError, snackbarSuccess, confirmBox])

	return <>

		<RadixButton
			className="cursor-pointer"
			onClick={handleClieck}
		>{icon ? <Icon icon={icon} size={14} /> : ""}
			{label}
		</RadixButton>
		<ConfirmBox
			id="confirmBox"
			open={open}
			onOpenChange={() => setOpen(prev => !prev)}
			onConfirm={handleConfirm}
			title="Delete item"
			description="This action cannot be undone. Are you sure you want to continue?"
		/>
	</>
})

Button.displayName = 'Button';

export { Button };