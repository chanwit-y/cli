# UI Component Library

A comprehensive React + TypeScript UI component library with a focus on form components and user interface elements.

## Current Components

### Form Components
- **TextField** - Single-line text input with validation support
- **Textarea** - Multi-line text input component
- **SelectField** - Dropdown selection component
- **Form** - Form wrapper with validation and state management

### Higher-Order Components
- **withForm** - HOC for form integration and validation

### Context Providers
- **ThemeProvider** - Theme management and styling context

## Planned Form Components Roadmap

### Text Input Components
- [ ] Enhanced text inputs with additional types (password, email, number, search, URL, tel)
- [x] Text input (single line) - **TextField**
- [x] Textarea (multi-line text) - **Textarea**

### Selection Components
- [ ] Checkbox (single or multiple options)
- [ ] Radio buttons (single selection from group)
- [x] Select dropdown - **SelectField**
- [ ] Multi-select dropdown
- [ ] Combobox (searchable dropdown)

### Date/Time Components
- [ ] Date picker
- [ ] Time picker
- [ ] DateTime picker
- [ ] Date range picker

### File Components
- [ ] File upload
- [ ] Image upload with preview
- [ ] Drag & drop file area

### Interactive Components
- [ ] Toggle switch
- [ ] Slider/range input
- [ ] Color picker
- [ ] Rating (stars/numbers)

### Button Components
- [ ] Submit button
- [ ] Reset button
- [ ] Cancel button

### Specialized Components
- [ ] CAPTCHA
- [ ] OTP/PIN input
- [ ] Tags input
- [ ] Rich text editor
- [ ] Autocomplete input

## Component Features

Each form component includes:
- **Validation states** - Built-in validation with error/success states
- **Labels and help text** - Accessible labeling and contextual help
- **Error messaging** - Clear error communication
- **Theme integration** - Consistent styling with theme system
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **TypeScript support** - Full type safety and IntelliSense

## Development Setup

This package is built with:
- React + TypeScript
- Vite for bundling
- ESLint for code quality
- Tailwind CSS for styling

## Usage

```tsx
import { TextField, Form, Button } from '@library/ui'

function MyForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```
