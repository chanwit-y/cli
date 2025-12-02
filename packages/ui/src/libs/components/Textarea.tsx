import type { TextareaProps } from "./@types"
import type { ElementRef } from "react"

import { forwardRef, useMemo, useEffect, useRef } from "react"
import { Text, Box } from '@radix-ui/themes'
import { cn } from "../util/utils"
// import { withTheam } from "./context"

const TextareaBase = forwardRef<
	ElementRef<"textarea">,
	TextareaProps
>(({
	className,
	label,
	placeholder,
	helperText,
	error = false,
	errorMessage,
	rows = 4,
	cols,
	resize = "vertical",
	autoResize = false,
	maxLength,
	showCharCount = false,
	value,
	onChange,
	...props
}, ref) => {
	const hasError = useMemo(() => error || !!errorMessage, [error, errorMessage])
	const displayHelperText = hasError ? errorMessage : helperText
	const internalRef = useRef<HTMLTextAreaElement>(null)
	const textareaRef = ref || internalRef

	// Auto-resize functionality
	useEffect(() => {
		if (autoResize && textareaRef && 'current' in textareaRef && textareaRef.current) {
			const textarea = textareaRef.current
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}, [value, autoResize, textareaRef])

	// Character count
	const currentLength = typeof value === 'string' ? value.length : 0
	const showCount = showCharCount || maxLength

	return (
		<Box className="w-full">
			{label && (
				<Text as="label" size="2" weight="medium" className="block mb-1">
					{label}
				</Text>
			)}

			<textarea
				ref={textareaRef}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				rows={rows}
				cols={cols}
				maxLength={maxLength}
				className={cn(
					// Base styles matching Radix UI theme
					"w-full bg-white border border-gray-200 rounded-md px-3 py-2",
					"text-sm text-gray-900 placeholder:text-gray-400",
					"transition duration-200 ease-in-out",
					"",
					// "hover:border-gray-300",
					"disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
					// Resize styles
					resize === "none" && "resize-none",
					resize === "both" && "resize",
					resize === "horizontal" && "resize-x",
					resize === "vertical" && "resize-y",
					// Auto-resize styles
					autoResize && "resize-none overflow-hidden",
					// Error styles
					//focus:ring-red-500
					hasError ? "border-red-500 focus:outline-none  focus:border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
					className
				)}
				{...props}
				{...(hasError && { 'data-error': 'true' })}
			/>

			<div className="flex justify-between ">
				<div>
					{displayHelperText && (
						<Text
							size="1"
							className={cn(
								"block",
								hasError ? "text-red-500" : "text-gray-600"
							)}
						>
							{displayHelperText}
						</Text>
					)}
				</div>
				<div>

					{showCount && (
						<Text
							size="1"
							className={cn(
								"text-right ml-2",
								maxLength && currentLength > maxLength ? "text-red-500" : "text-gray-500"
							)}
						>
							{maxLength ? `${currentLength}/${maxLength}` : currentLength}
						</Text>
					)}
				</div>
				
			</div>
{/* <Box className="flex justify-between ">
					{displayHelperText && (
						<Text
							size="1"
							className={cn(
								"block",
								hasError ? "text-red-500" : "text-gray-600"
							)}
						>
							{displayHelperText}
						</Text>
					)}
				</Box>
				<Box>
					{showCount && (
						<Text
							size="1"
							className={cn(
								"text-right ml-2",
								maxLength && currentLength > maxLength ? "text-red-500" : "text-gray-500"
							)}
						>
							{maxLength ? `${currentLength}/${maxLength}` : currentLength}
						</Text>
					)}
				</Box> */}
		</Box>
	)
})

TextareaBase.displayName = "Textarea"

// const Textarea = withTheam(TextareaBase)

export { TextareaBase }
