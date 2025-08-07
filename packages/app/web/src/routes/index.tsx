import { createFileRoute } from '@tanstack/react-router'
import { TextField, TextFieldWithTheme } from 'vegaui'

// @ts-ignore
export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TextField />
      <TextFieldWithTheme />
    </div>
  )
}