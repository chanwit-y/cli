import { useEffect, type ComponentProps, type ComponentType } from "react"
import type { ArrayPath, Control, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"

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
		// const { watch } = useFormContext()


		// const { fields, append, remove } = useFieldArray({
		// 	control,
		// 	name: name as ArrayPath<TFieldValues>,
		// })

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
						// fields={fields}
						// append={append}
						// remove={remove}
						{...(restProps as any)}
					/>
				)
			}}
		/>
	}
}