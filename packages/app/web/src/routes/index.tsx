import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Form, SelectField, TextField } from 'vegaui'
import { string, object } from 'zod'
import "../style/vegaui.css"

// @ts-ignore
export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {


	const F = useMemo(() => (new Form(object({
		title: string(),
		name: string().min(1),
	}), {
		name: "John Doe"
	})).setup().create(), [])


	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			{/* <F.Pv>

			</F.Pv> */}
			<F.Fn>
				{(f) => (
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
											{ value: "mr", label: "Mr" },
											{ value: "mrs", label: "Mrs" },
											{ value: "ms", label: "Ms" },
										]}
										placeholder="Select Title"
										label="Title"
										className="w-400"
										size="2"
										variant="surface"
										helperText="Select your title"
									/>
									<input type="text" className=' border border-amber-600' />
									{f._form?.watch("name")}
									{/* {watch("name")} */}
									<hr />
									<button onClick={() => {
										console.log(f.getError())
										// console.log()

										f._form?.handleSubmit((data) => {
											console.log(data)
										})
									}}>Submit</button>
								{/* </>
							)
						})} */}
					</>
				)}
			</F.Fn>
			<F.El>
				<TextField name="name" />
				<button type='submit'>Submit</button>
			</F.El>
		</div>
	)
}