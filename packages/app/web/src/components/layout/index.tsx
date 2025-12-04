import { ThemeProvider } from "vegaui"

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider
			components={{
				button: {
					color: 'violet'
				},
				dataTable: {
					headerColor: 'violet',
					editButtonColor: 'violet',
					deleteButtonColor: 'violet',
					headerHoverColor: 'violet',
					paginationButtonColor: 'violet',
					rowHoverColor: 'violet',
					paginationButtonHoverColor: 'violet',
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