import { isAllowedRoles } from "@/auth/isAllowedRoles"
import BotChat from "@/components/shared/BotChat"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

export default async function BotPage() {
	await connection()
	await isAllowedRoles([Role.admin])
	return (
		<BotChat
			apiRoute={"/api/chat/user"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm supervisor Bot",
				ar: "مرحبا, أنا supervisor بوت",
			}}
			emptyDescription={{
				en: "The supervisor assistant to provide you with solutions in your business",
				ar: "مساعدك الذكي لاقدم لك حلولا في مشروعك التجاري ",
			}}
		/>
	)
}
