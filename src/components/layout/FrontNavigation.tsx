"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { frontNavLinks } from "@/constants/nav"
import { useCurrentLocale } from "@/locales/client"
import { Button } from "@/components/ui/button"

export default function FrontNavigation() {
	const pathName = usePathname()
	const locale = useCurrentLocale()

	return (
		<>
			{frontNavLinks.map((link) => {
				const Icon = link.icon

				// 1. بناء المسار المتوقع باللغة الحالية مع معالجة الشُرَط المائلة (Double Slashes)
				const linkPath = `/${locale}${link.href.startsWith("/") ? link.href : `/${link.href}`}`.replace(/\/+/g, "/")

				// 2. التحقق من مطابقة الصفحة الرئيسية أو المسارات الفرعية
				const isHome = link.href === "/" || link.href === ""
				const isActive = isHome
					? pathName === `/${locale}` || pathName === `/${locale}/`
					: pathName === linkPath || pathName.startsWith(`${linkPath}/`)

				return (
					<Button
						key={link.href}
						asChild
						variant={isActive ? "default" : "ghost"}
						size="sm"
						className="lg:justify-center justify-start w-full lg:w-fit h-10 lg:h-8 "
					>
						<Link href={`/${locale}${link.href.startsWith("/") ? link.href : `/${link.href}`}`}>
							{isActive && Icon ? <Icon /> : null}
							{locale === "ar" ? link.title.ar : link.title.en}
						</Link>
					</Button>
				)
			})}
		</>
	)
}
