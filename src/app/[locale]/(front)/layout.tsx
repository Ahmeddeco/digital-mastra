import Header from "@/components/layout/Header"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-[70vh] overflow-x-hidden px-4 container mx-auto">
			<Header />
			<main className="w-full px-4 pt-16 " suppressHydrationWarning>
				{children}
			</main>
		</div>
	)
}
