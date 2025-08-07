import { Theme, type ThemeProps } from '@radix-ui/themes'

interface ThemeProviderProps {
  children: React.ReactNode
  theme?: ThemeProps 
  className?: string
}

export function ThemeProvider({ 
  children, 
  theme = { 
    appearance: 'light', 
    accentColor: 'blue', 
    radius: 'medium' 
  },
  className 
}: ThemeProviderProps) {
  return (
    <Theme {...theme} className={className}>
      {children}
    </Theme>
  )
}