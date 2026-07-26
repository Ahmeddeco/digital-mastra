import Footer from "@/components/layout/Footer"
import { ServerSidebar } from "@/components/layout/ServerSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"

export default async function ServerLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: "ar" | "en" }>
}) {
	const locale = (await params).locale

	return (
		<SidebarProvider suppressHydrationWarning>
			<ServerSidebar locale={locale} />
			<div className="flex flex-col  w-full">
				<main className="space-y-6 p-6 min-h-[80vh]">
					<SidebarTrigger />
					{children}
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
				</main>
				<Footer />
			</div>
		</SidebarProvider>
	)
}
