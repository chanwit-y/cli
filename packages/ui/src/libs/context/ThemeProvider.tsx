
import { createContext, use, type ComponentType } from 'react'
import type { BaseComponentProps, ThemeContextType, ThemeProviderProps } from '../@types'
import { Theme } from '@radix-ui/themes'


const ThemeContext = createContext<ThemeContextType>({})

export function ThemeProvider({
  children,
  theme = {
    appearance: 'light',
    accentColor: 'blue',
    radius: 'small',
  },
  className,
  textField
}: ThemeProviderProps) {
  return (
    <ThemeContext value={{ textField }}>
      <Theme panelBackground="translucent" {...theme} className={className}>
        {children}
      </Theme>
    </ThemeContext>
  )
}

export const useTheme = () => {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const withTheam = (Component: ComponentType<BaseComponentProps>) => {

  return (props: any) => {
    const { textField } = useTheme()

    switch (Component.displayName) {
      case "TextField":
        return <Component {...props} {...textField} />
      default:
        return <Component {...props} />
    }



  }
}