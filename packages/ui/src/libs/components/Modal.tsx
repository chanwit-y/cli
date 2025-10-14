import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { forwardRef } from "react"
import type { ReactNode } from "react"

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
			trigger,
			title = "Modal",
			description,
			children,
			cancelText = "Cancel",
			confirmText = "Confirm",
			onConfirm,
			onCancel,
			confirmColor = "blue",
			maxWidth = "500px",
			open,
			onOpenChange,
		},
		ref
	) => {
		return (
			<AlertDialog.Root open={open} onOpenChange={onOpenChange}>
				{trigger && <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>}
				<AlertDialog.Content maxWidth={maxWidth} ref={ref}>
					<AlertDialog.Title>{title}</AlertDialog.Title>
					{/* {description && (
						<AlertDialog.Description size="2">
							{description}
						</AlertDialog.Description>
					)} */}

					{children && <div style={{ marginTop: "1rem" }}>{children}</div>}

					{/* <Flex gap="3" justify="end" mt="4">
						<AlertDialog.Cancel>
							<Button
								variant="soft"
								color="gray"
								onClick={onCancel}
							>
								{cancelText}
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color={confirmColor} onClick={onConfirm}>
								{confirmText}
							</Button>
						</AlertDialog.Action>
					</Flex> */}
				</AlertDialog.Content>
			</AlertDialog.Root>
		)
	}
)

Modal.displayName = "Modal"

export { Modal } 