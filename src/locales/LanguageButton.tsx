"use client"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useChangeLocale, useCurrentLocale } from "@/locales/client"

export default function LanguageButton() {
	const changeLocale = useChangeLocale()
	const locale = useCurrentLocale()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon-lg"} variant={"ghost"}>
					{locale}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<DropdownMenuItem onClick={() => changeLocale("ar")}>Ar</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLocale("en")}>En</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
