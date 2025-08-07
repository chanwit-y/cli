
import type { ThemeProviderProps } from '../@types'
import { Theme } from '@radix-ui/themes'



export function ThemeProvider({ 
  children, 
  theme = { 
    appearance: 'light', 
    accentColor: 'blue', 
    radius: 'small',
     
  },
  className 
}: ThemeProviderProps) {
  return (
    <Theme panelBackground="translucent" {...theme} className={className}>
      {children}
    </Theme>
  )
}