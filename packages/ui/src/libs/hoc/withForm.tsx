import type { ComponentProps, ComponentType } from "react"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Controller } from "react-hook-form"

type WithFormProps<TFieldValues extends FieldValues = FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
}

type FormComponentProps = {
	onChange?: (...event: unknown[]) => void
	onBlur?: () => void
}

export const withForm = <T extends any>(Component:
	ComponentType<FormComponentProps> & T) => {
	return <TFieldValues extends FieldValues = FieldValues>({
		control,
		name,
		...props
	}: WithFormProps<TFieldValues> & ComponentProps<any>) => {
		return <Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
				return (
					<Component
						ref={ref}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						error={!!error}
						errorMessage={error?.message}
						{...props}
					/>
				)
			}}
		/>
	}
}