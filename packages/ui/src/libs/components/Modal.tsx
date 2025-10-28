// import { AlertDialog } from "@radix-ui/themes"
import { forwardRef, useEffect } from "react"
import type { ReactNode } from "react"
import * as AlertDialog from '@radix-ui/react-dialog';
import { ThemeProvider } from "./context";
import { useFormContext } from "react-hook-form";
import { useCore } from "./core/context";

export interface ModalProps {
	trigger?: ReactNode
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
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
			children,
		}) => {


		return (
			// <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
			<AlertDialog.Root >
				{/* {trigger && <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>} */}
				<AlertDialog.Trigger asChild>
					<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
						Open Dialog
					</button>
				</AlertDialog.Trigger>

				<AlertDialog.Portal>
					<AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
					<AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 max-w-3/4 w-full mx-4" >

						<ThemeProvider
							components={{
								TextField: {
									size: "2",
								}
							}}
							className=" flex flex-col w-full">

							<AlertDialog.Title className="text-lg font-semibold mb-2">
								Modal Title
							</AlertDialog.Title>
							{/* <AlertDialog.Description className="text-gray-600 mb-4">
							This is a modal dialog. Click outside or press Escape to close.
						</AlertDialog.Description> */}

							{children && <div className="mb-4">{children}</div>}

							<div className="flex justify-end mt-4 gap-2">
								<AlertDialog.Close asChild>
									<button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
										Close
									</button>
								</AlertDialog.Close>
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