import BotChat from "@/components/shared/BotChat"

export default function BotPage() {
	return (
		<BotChat
			apiRoute={"/api/chat/marketing"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm Marketing Bot",
				ar: "مرحبا, أنا ماركت بوت",
			}}
			emptyDescription={{
				en: "Your smart assistant to provide you with solutions in your business",
				ar: "مساعدك الذكي لاقدم لك حلولا في مشروعك التجاري ",
			}}
		/>
	)
}
