
import { createContext, use, type ComponentType } from 'react'
import type { BaseComponentProps, Components, ThemeContextType, ThemeProviderProps } from '../@types'
import { Theme } from '@radix-ui/themes'


const ThemeContext = createContext<ThemeContextType>({
  components: {
    TextField: {},
    Button: {},
  }
})

export function ThemeProvider({
  children,
  theme = {
    appearance: 'light',
    accentColor: 'blue',
    radius: 'small',
  },
  className,
  components
}: ThemeProviderProps) {
  return (
    <ThemeContext value={{ components: { ...components } }}>
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


export const withTheam = <T extends any>(Component: ComponentType<BaseComponentProps & T>) => {

  return (props: any) => {
    const { components } = useTheme()
    return <Component {...props} {...(components[Component.displayName as keyof Components] || {})} />
  }
}