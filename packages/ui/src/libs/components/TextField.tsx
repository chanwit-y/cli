import type { TextFieldProps } from "../@types"
import type { ElementRef } from "react"

import { forwardRef, useMemo } from "react"
import { TextField as RadixTextField, Text, Box } from '@radix-ui/themes'
import { cn } from "../util/utils"
import { withTheam } from "../context"

const TextFieldBase = forwardRef<
	ElementRef<typeof RadixTextField.Root>,
	TextFieldProps
>(({
	className,
	label,
	placeholder,
	helperText,
	error = false,
	errorMessage,
	variant = "surface",
	size = "2",
	radius = "medium",
	...props
}, ref) => {
	// const hasError = error || !!errorMessage
	const hasError = useMemo(() => error || !!errorMessage, [error, errorMessage])
	const displayHelperText = hasError ? errorMessage : helperText

	return (
		<Box className="w-full">
			{label && (
				<Text as="label" size="2" weight="medium" className="block mb-1">
					{label}
				</Text>
			)}

			<RadixTextField.Root
				ref={ref}
				variant={variant}
				size={size}
				radius={radius}
				placeholder={placeholder}

				// className={cn(
				// 	 "border-red-500 focus-within:border-red-500",
				// 	className
				// )}
				className={cn(
					hasError ? "border border-red-500 focus:outline-none focus:border-red-500" : "")}
				// className="border border-amber-600"
				// className={cn(
				// // 	// Base Tailwind classes that work with Radix
				// // 	// "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow",
				// // 	// "w-full border-red-400",
				// 	hasError && "border-red-500 focus-within:border-red-500",
				// 	className
				// )}
				
				{...props}
				{...(hasError && { 'data-error': 'true' })}
			/>
			{/* {String(hasError)} */}

			{displayHelperText && (
				<Text
					size="1"
					className={cn(
						"block mt-1",
						hasError ? "text-red-500" : "text-gray-600"
					)}
				>
					{displayHelperText}
				</Text>
			)}
		</Box>
	)
})

TextFieldBase.displayName = "TextField"

const TextField = withTheam(TextFieldBase)

export { TextFieldBase, TextField }