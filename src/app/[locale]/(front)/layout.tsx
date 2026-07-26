import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-[70vh] h-auto overflow-hidden ">
			<Header />
			<main className="w-full min-h-[80vh] px-4 pt-16 container mx-auto " suppressHydrationWarning>
				{children}
			</main>
			<Toaster
				theme="system"
				richColors
				duration={5000}
				icons={{
					success: <CircleCheckBig />,
					warning: <CircleAlert />,
					error: <CircleX />,
				}}
			/>
			<Footer />
		</div>
	)
}
