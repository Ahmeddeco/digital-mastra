import NavBar from "@/components/layout/Header"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-[70vh] overflow-x-hidden px-4 container mx-auto">
			<NavBar />
			<main className="w-full px-4 pt-20 " suppressHydrationWarning>
				{children}
			</main>
		</div>
	)
}
