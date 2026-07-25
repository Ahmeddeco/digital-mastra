import UserButton from "@/auth/UserButton"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import { ThemeButton } from "../theme/ThemeButton"
import FrontNavigation from "./FrontNavigation"
import LanguageButton from "./LanguageButton"

export default function Header() {
	return (
		<header className="fixed w-full inset-0 mx-auto bg-background/90 border drop-shadow-xl  backdrop-blur-2xl lg:rounded-full rounded-none px-4 h-14 z-50 container lg:mt-4 mt-0 flex items-center justify-between ">
			<div className="flex items-center justify-between container mx-auto">
				{/* --------------------------------- Logo -------------------------------- */}
				<Logo />

				{/* ---------------------------- DesktopNav ---------------------------- */}
				<nav className="hidden lg:flex items-center gap-4">
					<FrontNavigation />
				</nav>
				<nav className="lg:hidden flex items-center justify-center gap-4">
					<MobileMenu />
				</nav>
				{/* ------------------------------ Socials ----------------------------- */}
				<div className="lg:flex hidden items-center gap-4">
					<ThemeButton />
					<LanguageButton />
					<UserButton />
				</div>
			</div>
		</header>
	)
}
