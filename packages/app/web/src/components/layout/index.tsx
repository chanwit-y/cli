import { ThemeProvider } from "vegaui"

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider
			components={{
				button: {
					color: 'purple'
				},
				dataTable: {
					headerColor: 'purple',
					editButtonColor: 'purple',
					deleteButtonColor: 'purple',
					headerHoverColor: 'purple',
					paginationButtonColor: 'purple',
					rowHoverColor: 'purple',
					paginationButtonHoverColor: 'purple',
				}
			}}
			className="min-h-screen flex flex-col w-full">
			{/* NavBar */}
			<div className="flex flex-1 overflow-hidden">
				{/* SideBar */}
				<main className="flex-1 overflow-auto">
					{children}
				</main>
			</div>
		</ThemeProvider>
	)
}