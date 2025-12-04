
import { createContext, use } from 'react'
import type { ThemeContextType, ThemeProviderProps } from '../@types'
import { Theme } from '@radix-ui/themes'


const ThemeContext = createContext<ThemeContextType>({
  components: {
    button: {
      color: 'blue',
    },
    dataTable: {
      headerColor: 'blue',
      headerHoverColor: 'blue',
      paginationButtonColor: 'blue',
      paginationButtonHoverColor: 'blue',
      rowHoverColor: 'blue',
      editButtonColor: 'blue',
      deleteButtonColor: 'blue',
    }
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
    <ThemeContext.Provider value={{ components: { ...components } }}>
      <Theme panelBackground="translucent" {...theme} className={className}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


// export const withTheam = <T extends any>(Component: ComponentType<BaseComponentProps & T>): ComponentType<BaseComponentProps & T> => {

//   const WrappedComponent = (props: any) => {
//     const { components } = useTheme()
//     return <Component {...props} {...(components[Component.displayName as keyof Components] || {})} />
//   }
  
//   WrappedComponent.displayName = `withTheam(${Component.displayName || Component.name || 'Component'})`
  
//   return WrappedComponent
// }