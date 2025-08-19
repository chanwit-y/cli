import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Form, TextField } from 'vegaui'
import z from 'zod'

// @ts-ignore
export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {


	const F = useMemo(() => (new Form(z.object({
		name: z.string().min(1),
	}), {
		name: "John Doe"
	})).setup().create(), [])


	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<F.Fn>
				{(f) => (
					<>
						<TextField name="name" form={f} />
						<button onClick={() => {
							console.log(f.getError())

							f._form?.handleSubmit((data) => {
								console.log(data)
							})
						}}>Submit</button>
					</>
				)}
			</F.Fn>
			<F.El>
				<TextField name="name" />
			</F.El>
		</div>
	)
}