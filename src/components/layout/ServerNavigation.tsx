"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"
import { serverNav } from "@/constants/serverNav"
import { useCurrentLocale } from "@/locales/client"
import { SidebarMenu } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function ServerNavigation() {
	const pathName = usePathname()
	const locale = useCurrentLocale()

	return (
		<SidebarMenu className="h-full space-y-2">
			{serverNav.map(({ href, title, icon }) => {
				const isActive = pathName === `/${locale}${href}`

				return (
					<SidebarMenu key={href}>
						<Button asChild variant={isActive ? "default" : "ghost"} size={"full"} className=" justify-start">
							<Link href={href}>
								{isActive ? React.createElement(icon) : null}
								{locale === "ar" ? title.ar : title.en}
							</Link>
						</Button>
					</SidebarMenu>
				)
			})}
		</SidebarMenu>
	)
}
