import { useEffect, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Form, SelectField, TextField, Textarea, Checkbox, RadioButton } from 'vegaui'
import { string, object, boolean } from 'zod'
import { useFormContext } from 'react-hook-form'

// @ts-ignore
export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {


	const F = useMemo(() => (new Form(object({
		title: string(),
		name: string("name is required").min(1),
		description: string("description is required").min(1),
		isAgree: boolean("isAgree is required"),
		preference: string("preference is required"),
	}), {
	})).setup().create(), [])


	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			{/* <F.Pv>

			</F.Pv> */}
			{/* <F.Fn>
				{(f) => (
					
				)}
			</F.Fn> */}
			<F.El>
				<FormDemo />
			</F.El>
		</div>
	)
}

const FormDemo = ()=> {
	const f = useFormContext()
	useEffect(() => {
		f.trigger();
	}, [])
	return (
		<>
						{/* {f.container(() => {
							const { watch, formState: {errors}} = useFormContext()
							return (
								<> */}
									<TextField name="name" form={f} />
									<SelectField
										name="title"
										form={f}
										options={[
											// { value: "", label: "None" },
											{ value: "mr", label: "Mr" },
											{ value: "mrs", label: "Mrs" },
											{ value: "ms", label: "Ms" },
										]}
										placeholder="Select Title"
										label="Title"
										className="w-400"
										size="2"
										variant="surface"
										// helperText="Select your title"
									/>
									{/* {f.watch("name")} */}
									<Textarea name="description" label="Description" form={f} showCharCount={true} />
									<RadioButton 
										name="preference" 
										label="Communication Preference" 
										form={f}
										options={[
											{ value: "email", label: "Email", helperText: "Receive updates via email" },
											{ value: "sms", label: "SMS", helperText: "Receive updates via text message" },
											{ value: "phone", label: "Phone Call", helperText: "Receive updates via phone call" },
											{ value: "none", label: "No Communication", helperText: "Do not contact me" }
										]}
										helperText="Choose how you'd like to receive updates"
									/>
									<Checkbox name="isAgree" label="I agree to the terms and conditions" form={f} />
									{/* {watch("name")} */}
									<hr />
									<button onClick={() => {
										// console.log(f.getError())
										// console.log()

										f.handleSubmit((data) => {
											console.log(data)
										})
									}}>Submit</button>
								{/* </>
							)
						})} */}
					</>
	)
}