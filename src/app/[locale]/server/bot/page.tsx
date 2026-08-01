import { isAllowedRoles } from "@/auth/isAllowedRoles"
import BotChat from "@/components/shared/BotChat"
import { Role } from "@/generated/prisma/enums"

export default async function BotPage() {
		await isAllowedRoles([Role.admin])
	
	return (
		<BotChat
			apiRoute={"/api/chat/user"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm digi Bot",
				ar: "مرحبا, أنا ديجي بوت",
			}}
			emptyDescription={{
				en: "Your smart assistant to provide you with solutions in your business",
				ar: "مساعدك الذكي لاقدم لك حلولا في مشروعك التجاري ",
			}}
		/>
	)
}
