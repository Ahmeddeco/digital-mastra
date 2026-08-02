import type { Metadata, Viewport } from "next"
import "../globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import localFont from "next/font/local"
import { DirectionProvider } from "@/components/ui/direction"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Suspense } from "react"
import { UploadthingSSRPlugin } from "@/utils/uploadthing-plugin"

/* -------------------------------- localFont ------------------------------- */
const cairo = localFont({
	src: "../../../public/fonts/Cairo.ttf",
	variable: "--cairo-font",
})

/* -------------------------------- APP_INFO -------------------------------- */
const APP_NAME = "Digital"
const APP_DEFAULT_TITLE = "Digital | Marketing and Programming Agency."
const APP_TITLE_TEMPLATE = "%s - Digital"
const APP_DESCRIPTION = "وكالة متخصصة في التسويق الرقمي والبرمجة."
const baseUrl = process.env.NEXT_PUBLIC_APP_URL
	? process.env.NEXT_PUBLIC_APP_URL
	: process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://interior-eg.vercel.app"

/* -------------------------------- Metadata -------------------------------- */
export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),

	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_NAME,
	},
	formatDetection: {
		telephone: false,
	},
	icons: {
		icon: [
			{ url: "/icons/manifest-icon-192.maskable.png", sizes: "192x192", type: "image/png" },
			{ url: "/icons/manifest-icon-512.maskable.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
}

/* -------------------------------- Viewport -------------------------------- */
export const viewport: Viewport = {
	themeColor: "#f7dc6f",
}

/* -------------------------- generateStaticParams -------------------------- */
export function generateStaticParams() {
	return [{ locale: "ar" }, { locale: "en" }]
}

/* ------------------------------- RootLayout ------------------------------- */
export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const locale = (await params).locale

	return (
		<html
			lang={locale}
			dir={locale === "ar" ? "rtl" : "ltr"}
			className={`h-full antialiased ${cairo.className}`}
			suppressHydrationWarning
		>
			<body className="scroll-smooth min-h-screen w-full overflow-x-hidden">
				<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
					<Suspense fallback={null}>
						<UploadthingSSRPlugin />
					</Suspense>
					<TooltipProvider>
						<DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>{children}</DirectionProvider>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
