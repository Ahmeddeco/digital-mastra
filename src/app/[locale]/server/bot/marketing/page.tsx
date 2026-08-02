import { isAllowedRoles } from "@/auth/isAllowedRoles"
import BotChat from "@/components/shared/BotChat"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

export default async function MarketingBotPage() {
	await connection()
	await isAllowedRoles([Role.admin, Role.marketer])
	return (
		<BotChat
			apiRoute={"/api/chat/marketing"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm Marketing Bot",
				ar: "مرحبا, أنا ديجي بوت",
			}}
			emptyDescription={{
				en: "The marketing assistant to provide you with solutions in your marketing journey.",
				ar: "مساعدك الذكي لاقدم لك حلولا في مشروعك التجاري ",
			}}
		/>
	)
}
