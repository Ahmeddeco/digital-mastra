import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarFooter,
} from "@/components/ui/sidebar"
import Logo from "./Logo"
import UserButton from "@/auth/UserButton"
import ServerNavigation from "@/components/layout/ServerNavigation"
import { ThemeButton } from "@/components/theme/ThemeButton"
import LanguageButton from "@/locales/LanguageButton"

type Props = {
	locale: "ar" | "en"
}

export function ServerSidebar({ locale }: Props) {
	return (
		<Sidebar side={locale === "ar" ? "right" : "left"}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Logo />
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-4 ">
						<ServerNavigation />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="flex flex-row items-center justify-between">
				<ThemeButton />
				<LanguageButton />
				<UserButton />
			</SidebarFooter>
		</Sidebar>
	)
}
