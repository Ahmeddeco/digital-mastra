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
		<Link href="/" className="flex items-end justify-center gap-1">
			<div className="relative h-10 w-fit aspect-square ">
				<Image
					src={"/icons/logo.webp"}
					alt={"logo"}
					fill
					className={`object-contain ${locale === "en" ? "object-right" : "object-left"}`}
				/>
			</div>
			<h2 className={`${reverse && "text-background"}  lowercase `}>{locale === "en" ? "igital" : "ديجيتال"}</h2>
		</Link>
	)
}
