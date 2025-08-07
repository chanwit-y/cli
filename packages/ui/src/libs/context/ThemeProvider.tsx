
import { createContext } from 'react'
import type { ThemeContextType, ThemeProviderProps } from '../@types'
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