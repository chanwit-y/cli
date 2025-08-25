import type { CheckboxProps } from "../@types"
import type { ElementRef } from "react"

import { forwardRef, useMemo } from "react"
import { Checkbox as RadixCheckbox, Text, Box, Flex } from '@radix-ui/themes'
import { cn } from "../util/utils"
import { withTheam } from "../context"

const CheckboxBase = forwardRef<
	ElementRef<typeof RadixCheckbox>,
	CheckboxProps & { onChange?: (checked: boolean) => void }
>(({
	label,
	helperText,
	error = false,
	errorMessage,
	variant = "surface",
	size = "2",
	checked,
	onCheckedChange,
	onChange,
	indeterminate,
	className,
	...props
}, ref) => {
	const hasError = useMemo(() => error || !!errorMessage, [error, errorMessage])
	const displayHelperText = hasError ? errorMessage : helperText
	
	// Handle both onChange (from form) and onCheckedChange (direct usage)
	const handleCheckedChange = (newChecked: boolean) => {
		onCheckedChange?.(newChecked)
		onChange?.(newChecked)
	}

	return (
		<Box className="w-full">
			<Flex direction="column" gap="1">
				<Flex align="center" gap="2">
					<RadixCheckbox
						ref={ref}
						variant={variant}
						size={size}
						checked={checked}
						onCheckedChange={handleCheckedChange}
						className={cn(
							"transition duration-200 ease-in-out",
							// hasError
							// 	? "!border !border-red-500 focus:outline-none focus:!border-red-500"
							// 	: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
							className
						)}
						{...props}
						{...(hasError && { 'data-error': 'true' })}
						{...(indeterminate && { 'data-state': 'indeterminate' })}
					/>
					{label && (
						<Text 
						as="label" 
						size="2" 
						weight="medium" 
						className={cn("cursor-pointer", hasError ? "text-red-500" : "text-gray-600")}
						>
							{label}
						</Text>
					)}
				</Flex>

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
			</Flex>
		</Box>
	)
})

CheckboxBase.displayName = "Checkbox"

const Checkbox = withTheam(CheckboxBase)

export { CheckboxBase, Checkbox }
