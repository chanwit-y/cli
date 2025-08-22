import { useEffect, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Form, SelectField, TextField, Textarea } from 'vegaui'
import { string, object } from 'zod'
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
									<Textarea name="description" label="Description" form={f} />
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