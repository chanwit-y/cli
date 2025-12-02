import type { RadioButtonProps } from "./@types"
import type { ElementRef } from "react"

import { forwardRef, useMemo } from "react"
import { RadioGroup, Text, Box, Flex } from '@radix-ui/themes'
import { cn } from "../util/utils"
// import { withTheam } from "./context"

const RadioButtonBase = forwardRef<
	ElementRef<typeof RadioGroup.Root>,
	RadioButtonProps & { onChange?: (value: string) => void }
>(({
	className,
	label,
	helperText,
	error = false,
	errorMessage,
	variant = "surface",
	size = "2",
	value,
	onValueChange,
	onChange,
	options,
	orientation = "vertical",
	...props
}, ref) => {
	const hasError = useMemo(() => error || !!errorMessage, [error, errorMessage])
	const displayHelperText = hasError ? errorMessage : helperText

	// Handle both onChange (from form) and onValueChange (direct usage)
	const handleValueChange = (newValue: string) => {
		onValueChange?.(newValue)
		onChange?.(newValue)
	}

	return (
		<Box className="w-full">
			{label && (
				<Text as="label" size="2" weight="medium" className="block mb-2">
					{label}
				</Text>
			)}

			<RadioGroup.Root
				ref={ref}
				variant={variant}
				size={size}
				value={value}
				onValueChange={handleValueChange}
				orientation={orientation}
				className={cn(
					"transition duration-200 ease-in-out",
					hasError && "data-[error=true]:text-red-500",
					className
				)}
				{...props}
				{...(hasError && { 'data-error': 'true' })}
			>
				<Flex 
					direction={orientation === "horizontal" ? "row" : "column"} 
					gap="3"
					wrap={orientation === "horizontal" ? "wrap" : undefined}
				>
					{options.map((option) => (
						<Flex key={option.value} align="center" gap="2" asChild>
							<Text as="label" size="2" className="cursor-pointer">
								<RadioGroup.Item
									value={option.value}
									disabled={option.disabled}
									className={cn(
										"transition duration-200 ease-in-out",
										hasError
											? "focus:outline-none focus:ring-2 focus:ring-red-500 data-[state=checked]:border-red-500"
											: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
										option.disabled && "opacity-50 cursor-not-allowed"
									)}
								/>
								<Box>
									<Text weight="medium">{option.label}</Text>
									{option.helperText && (
										<Text size="1" className="text-gray-600 block">
											{option.helperText}
										</Text>
									)}
								</Box>
							</Text>
						</Flex>
					))}
				</Flex>
			</RadioGroup.Root>

			{displayHelperText && (
				<Text
					size="1"
					className={cn(
						"block mt-2",
						hasError ? "text-red-500" : "text-gray-600"
					)}
				>
					{displayHelperText}
				</Text>
			)}
		</Box>
	)
})

RadioButtonBase.displayName = "RadioButton"

// const RadioButton = withTheam(RadioButtonBase)

export { RadioButtonBase }
