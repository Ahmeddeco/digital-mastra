import { getDictionary } from "@/locales/dictionaries"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

export default async function StartProjectBtn({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<Link href="/projects/start">
			<Button>{dict.startProjectBtn.title}</Button>
		</Link>
	)
}
