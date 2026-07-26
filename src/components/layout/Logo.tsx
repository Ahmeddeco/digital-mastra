"use client"

import { useCurrentLocale } from "@/locales/client"
import Image from "next/image"
import Link from "next/link"

type Props = {
	reverse?: boolean
}

export default function Logo({ reverse = false }: Props) {
	const locale = useCurrentLocale()

	return (
		<Link href="/" className="flex items-end justify-center gap-0.5 ">
			<div className="relative size-9 ">
				<Image
					src={"/icons/logo.webp"}
					alt={"logo"}
					fill
					className={`object-contain ${locale === "en" ? "object-right" : "object-left"}`}
				/>
			</div>
			<h3 className={`${reverse && "text-background"}  lowercase leading-tight `}>
				{locale === "en" ? "igital" : "ديجيتال"}
			</h3>
		</Link>
	)
}
