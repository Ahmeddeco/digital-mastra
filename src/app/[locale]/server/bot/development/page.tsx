import { isAllowedRoles } from "@/auth/isAllowedRoles"
import BotChat from "@/components/shared/BotChat"
import { Role } from "@/generated/prisma/enums"

export default async function BotPage() {
	await isAllowedRoles([Role.admin, Role.developer])

	return (
		<BotChat
			apiRoute={"/api/chat/development"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm development Bot",
				ar: "مرحبا, أنا development بوت",
			}}
			emptyDescription={{
				en: "The development assistant to provide you with solutions in your development projects.",
				ar: "مساعدك الذكي لاقدم لك حلولا في مشروعك التجاري ",
			}}
		/>
	)
}
