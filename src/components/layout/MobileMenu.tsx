import UserButton from "@/auth/UserButton"
import FrontNavigation from "@/components/layout/FrontNavigation"
import Logo from "@/components/layout/Logo"
import { ThemeButton } from "@/components/theme/ThemeButton"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import LanguageButton from "@/locales/LanguageButton"
import { Menu } from "lucide-react"

export default function MobileMenu() {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button size={"icon"} variant={"ghost"}>
						<Menu />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader className="border-b ">
						<SheetTitle className="flex items-center justify-end ">
							<Logo />
						</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col items-center gap-6 p-4 h-fit ">
						<FrontNavigation />
					</nav>
					<SheetFooter className="flex-row items-center justify-between border-t shadow-md">
						<UserButton />
						<LanguageButton />
						<ThemeButton />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	)
}
