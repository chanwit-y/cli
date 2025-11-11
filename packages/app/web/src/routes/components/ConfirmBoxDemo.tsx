import { useCallback, useState } from "react"
import { ConfirmBox } from "vegaui"

export function ConfirmBoxDemo() {
	const [open, setOpen] = useState(false)

	const handleOpenChange = useCallback((nextOpen: boolean) => {
		setOpen(nextOpen)
	}, [])

	const handleConfirm = useCallback(() => {
		console.log("confirmed delete")
		setOpen(false)
	}, [])

	return (
		<div className="mt-8 flex flex-col gap-3">
			<button
				type="button"
				className="w-fit rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
				onClick={() => setOpen(true)}
			>
				Show Confirm Box
			</button>

			<ConfirmBox
				open={open}
				onOpenChange={handleOpenChange}
				title="Delete item"
				description="This action cannot be undone. Are you sure you want to continue?"
			/>
		</div>
	)
}

