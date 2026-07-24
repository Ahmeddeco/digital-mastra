"use client"

import { useCurrentLocale } from "@/locales/client.locale"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
	const locale = useCurrentLocale()

	return (
		<Link href="/" className="flex items-end justify-center gap-1">
			<div className="relative h-10 w-fit aspect-square ">
				<Image
					src={"/icons/logo.webp"}
					alt={"logo"}
					fill
					className={`object-contain ${locale === "en" ? "object-right" : "object-left"}`}
				/>
			</div>
			<h2 className="lowercase ">{locale === "en" ? "igital" : "ديجيتال"}</h2>
		</Link>
	)
}
