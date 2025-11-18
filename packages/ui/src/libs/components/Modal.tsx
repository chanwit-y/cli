// import { AlertDialog } from "@radix-ui/themes"
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import * as AlertDialog from "@radix-ui/react-dialog"
import { ThemeProvider } from "./context"
import type { ButtonElement } from "./@types"
import { ElementContext } from "./core/elementBuilder"
import "./Modal.css"
import { X } from "lucide-react"
import { useStord } from "./core/stord"

export interface ModalProps {
	id: string
	trigger?: ButtonElement
	title?: string
	// description?: string
	children?: ReactNode
	maxWidth?: string
	minWidth?: string
	open?: boolean
	onOpenChange?: (open: boolean) => void
	hiddenTrigger?: boolean
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
			id,
			children,
			trigger,
			title,
			maxWidth,
			minWidth,
			open,
			onOpenChange,
			hiddenTrigger,
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(open ?? false)
		const updateFnCtxs = useStord((state) => state.updateFnCtxs)


		useEffect(() => {
			if (open === undefined) return
			setIsOpen(open)
		}, [open])

		const triggerElement = useMemo(() => {
			if (!trigger) return null

			return new ElementContext({ ...trigger }).build("button")?.create()
		}, [trigger])

		const contentStyle = useMemo<CSSProperties | undefined>(() => {
			if (!maxWidth) return undefined

			return { maxWidth, minWidth }
		}, [maxWidth, minWidth])

		useEffect(() => {
			console.log('isOpen', isOpen)
		}, [isOpen])

		const handleOpenChange = useCallback(
			(nextOpen: boolean) => {
				console.log('handleOpenChange', id, nextOpen)
				setIsOpen(nextOpen)
				console.log('onOpenChange', onOpenChange)
				onOpenChange?.(nextOpen)
			}, [onOpenChange])

		useEffect(() => {
			console.log('test')
			//TODO: Implement a better way to handle this
			console.log('id', id, onOpenChange)
			updateFnCtxs(id, handleOpenChange)
		}, [id, updateFnCtxs])


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
					<AlertDialog.Content
						ref={ref}
						style={contentStyle}
						className="modal-content fixed top-1/2 left-1/2 z-50 mx-4 min-w-[400px] max-w-lg transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
					>

						<ThemeProvider
							components={{
								TextField: {
									size: "2",
								}
							}}
							className=" flex flex-col">
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									{title && (
										<AlertDialog.Title className="mb-2 text-lg font-semibold">
											{title}
										</AlertDialog.Title>
									)}
								</div>

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
							{id}
							{String(isOpen)}
							{children && <div className="mb-4">{children}</div>}
						</ThemeProvider>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		)
	}
)

Modal.displayName = "Modal"

export { Modal } 