"use client"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useChangeLocale } from "@/locales/client"
import { Languages } from "lucide-react"

export default function LanguageButton() {
	const changeLocale = useChangeLocale()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon-lg"} variant={"ghost"}>
					<Languages />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<DropdownMenuItem onClick={() => changeLocale("ar")}>Ar</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLocale("en")}>En</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
