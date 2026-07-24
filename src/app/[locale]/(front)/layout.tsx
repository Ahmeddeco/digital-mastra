import NavBar from "@/components/layout/NavBar"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-[70vh] overflow-x-hidden px-0">
			<NavBar />
			<main className="w-full px-4 pt-14 " suppressHydrationWarning>
				{children}
			</main>
		</div>
	)
}
