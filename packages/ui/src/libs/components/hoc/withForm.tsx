import type { ComponentProps, ComponentType } from "react"
import type { Control, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { BaseComponentProps } from "../@types"

type WithFormProps<TFieldValues extends FieldValues = FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
} | {
	form: UseFormReturn<TFieldValues>
	name: Path<TFieldValues>
}

type FormComponentProps = {
	onChange?: (...event: unknown[]) => void
	onBlur?: () => void
}

export const withForm = <T extends any>(Component:
	ComponentType<T>) => {
	return <TFieldValues extends FieldValues = FieldValues>(
		props: WithFormProps<TFieldValues> & ComponentProps<ComponentType<T & FormComponentProps>>
	) => {
		const { name, ...restProps } = props

		// Extract control from either 'control' prop or 'form.control'
		const control = 'control' in props ? props.control : props.form.control

		return <Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
				return (
					<Component
						ref={ref}
						name={name}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						error={!!error}
						errorMessage={error?.message}
						{...(restProps as any)}
					/>
				)
			}}
		/>
	}
}