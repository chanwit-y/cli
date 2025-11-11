import { forwardRef } from "react"
import * as AlertDialog from "@radix-ui/react-dialog"
import type { ModalProps } from "./Modal"
import { Modal } from "./Modal"

export interface ConfirmBoxProps
	extends Omit<ModalProps, "children" | "title"> {
	title: string
	description: string
}

const ConfirmBox = forwardRef<HTMLDivElement, ConfirmBoxProps>(
	(
		{
			title,
			description,
			hiddenTrigger = true,
			...modalProps
		},
		ref
	) => (
		<Modal
			{...modalProps}
			ref={ref}
			hiddenTrigger={hiddenTrigger}
		>
			<div className="flex flex-col gap-2 text-left">
				{title && (
					<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
				)}
				{description && (
					<p className="text-sm text-slate-600">{description}</p>
				)}
				<div className="mt-6 flex justify-end gap-2">
					<AlertDialog.Close asChild>
						<button
							type="button"
							className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
						>
							Close
						</button>
					</AlertDialog.Close>
					<AlertDialog.Close asChild>
						<button
							type="button"
							className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
						>
							Confirm
						</button>
					</AlertDialog.Close>
				</div>
			</div>
		</Modal>
	)
)

ConfirmBox.displayName = "ConfirmBox"

export { ConfirmBox }

