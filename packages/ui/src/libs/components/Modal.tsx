// import { AlertDialog } from "@radix-ui/themes"
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import * as AlertDialog from '@radix-ui/react-dialog';
import { ThemeProvider } from "./context";
import type { ButtonElement } from "./@types";
import { ElementContext } from "./core/elementBuilder";
import "./Modal.css";
import { X } from "lucide-react";

export interface ModalProps {
	trigger?: ButtonElement
	title?: string
	description?: string
	children?: ReactNode
	cancelText?: string
	confirmText?: string
	onConfirm?: () => void
	onCancel?: () => void
	confirmColor?: "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "gray"
	maxWidth?: string
	open?: boolean
	onOpenChange?: (open: boolean) => void
	hiddenTrigger?: boolean
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
			children,
			trigger,
			open,
			onOpenChange,
			hiddenTrigger,
		}) => {


		const [isOpen, setIsOpen] = useState(open ?? false)

		useEffect(() => {
			if (open === undefined) return
			setIsOpen(open)
		}, [open])

		const triggerElement = useMemo(() => {
			if (!trigger) return null;

			// const onClick = () => {
			// 	console.log('click')
			// 	setIsOpen(true)
			// }

			return (new ElementContext({ ...trigger })).build("button")?.create();
		}, [trigger, setIsOpen])


		const handleOpenChange = useCallback((nextOpen: boolean) => {
			setIsOpen(nextOpen)
			onOpenChange?.(nextOpen)
		}, [onOpenChange])

		// const handleTrigger = useCallback(() => {

		// 	setIsOpen(true)
		// }, [])

		return (
			<AlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
				{/* <AlertDialog.Root open={isOpen}>  */}

				{
					hiddenTrigger && trigger ? null : (
						<AlertDialog.Trigger asChild>
							{/* {trigger} */}
							{triggerElement}
							{/* <button  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
								Open Dialog
							</button> */}
						</AlertDialog.Trigger>
					)
				}

				<AlertDialog.Portal>
					<AlertDialog.Overlay className="modal-overlay fixed inset-0 z-50" />
					<AlertDialog.Content className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 max-w-3/4 w-full mx-4" >

						<ThemeProvider
							components={{
								TextField: {
									size: "2",
								}
							}}
							className=" flex flex-col w-full">
							<div className="flex justify-between">
								<AlertDialog.Title className="text-lg font-semibold mb-2">
									Modal Title

								</AlertDialog.Title>

								<AlertDialog.Close asChild>
									<button
										type="button"
										aria-label="Close modal"
										className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700  cursor-pointer"
									>
										<X className="h-4 w-4" />
									</button>
								</AlertDialog.Close>
							</div>
							{/* <AlertDialog.Description className="text-gray-600 mb-4">
							This is a modal dialog. Click outside or press Escape to close.
						</AlertDialog.Description> */}

							{children && <div className="mb-4">{children}</div>}

							<div className="flex justify-end mt-4 gap-2">
							</div>
						</ThemeProvider>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		)
	}
)

Modal.displayName = "Modal"

export { Modal } 