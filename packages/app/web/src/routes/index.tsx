import { useEffect, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Form, SelectField, TextField, Textarea, Checkbox, RadioButton, Autocomplete, AutocompleteF2 } from 'vegaui'
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
		country: string("country is required").min(1),
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

const FormDemo = () => {
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
			<AutocompleteF2
				name="country"
				form={f}
				label="Country"
				placeholder="Search for a country..."
				helperText="Select your country of residence"
				searchKey="label"
				idKey='id'
				displayKey="label"
				items={[
					{ id: "us", label: "United States" },
					{ id: "ca", label: "Canada" },
					{ id: "mx", label: "Mexico" },
					{ id: "uk", label: "United Kingdom" },
					{ id: "fr", label: "France" },
					{ id: "de", label: "Germany" },
					{ id: "es", label: "Spain" },
					{ id: "it", label: "Italy" },
					{ id: "nl", label: "Netherlands" },
					{ id: "jp", label: "Japan" },
					{ id: "kr", label: "South Korea" },
					{ id: "cn", label: "China" },
					{ id: "in", label: "India" },
					{ id: "th", label: "Thailand" },
					{ id: "sg", label: "Singapore" },
					{ id: "au", label: "Australia" },
					{ id: "nz", label: "New Zealand"},
					{ id: "br", label: "Brazil" },
					{ id: "ar", label: "Argentina" },
					{ id: "cl", label: "Chile" },
					{ id: "za", label: "South Africa" },
					{ id: "ng", label: "Nigeria" },
					{ id: "eg", label: "Egypt" }
				]}
				maxResults={10}
				variant="surface"
				size="2"
			/>
			{/* <Autocomplete
				name="country"
				form={f}
				label="Country"
				placeholder="Search for a country..."
				helperText="Select your country of residence"
				
				items={[
					{ id: "us", label: "United States", category: "North America" },
					{ id: "ca", label: "Canada", category: "North America" },
					{ id: "mx", label: "Mexico", category: "North America" },
					{ id: "uk", label: "United Kingdom", category: "Europe" },
					{ id: "fr", label: "France", category: "Europe" },
					{ id: "de", label: "Germany", category: "Europe" },
					{ id: "es", label: "Spain", category: "Europe" },
					{ id: "it", label: "Italy", category: "Europe" },
					{ id: "nl", label: "Netherlands", category: "Europe" },
					{ id: "jp", label: "Japan", category: "Asia" },
					{ id: "kr", label: "South Korea", category: "Asia" },
					{ id: "cn", label: "China", category: "Asia" },
					{ id: "in", label: "India", category: "Asia" },
					{ id: "th", label: "Thailand", category: "Asia" },
					{ id: "sg", label: "Singapore", category: "Asia" },
					{ id: "au", label: "Australia", category: "Oceania" },
					{ id: "nz", label: "New Zealand", category: "Oceania" },
					{ id: "br", label: "Brazil", category: "South America" },
					{ id: "ar", label: "Argentina", category: "South America" },
					{ id: "cl", label: "Chile", category: "South America" },
					{ id: "za", label: "South Africa", category: "Africa" },
					{ id: "ng", label: "Nigeria", category: "Africa" },
					{ id: "eg", label: "Egypt", category: "Africa" }
				]}
				maxResults={10}
				variant="surface"
				size="2"
			/> */}
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