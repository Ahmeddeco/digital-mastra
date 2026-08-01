import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getOneArticle } from "@/dl/article.data"
import EditArticle from "@/forms/EditArticle"
import { Role } from "@/generated/prisma/enums"
import { getOneArticleType } from "@/types/article.type"

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const article: getOneArticleType = await getOneArticle(id)
	return (
		<ServerPageCard
			title={"Edit service"}
			description={"Edit a service in the database."}
			href="/server/services"
			btnTitle={"back"}
		>
			<EditArticle article={article} />
		</ServerPageCard>
	)
}
