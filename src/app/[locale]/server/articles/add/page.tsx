import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import AddArticle from "@/forms/AddArticle"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

export default async function AddServicePage() {
	await connection()
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard
			title={"Add service"}
			description={"Add a service to the database."}
			href="/server/services"
			btnTitle={"back"}
		>
			<AddArticle />
		</ServerPageCard>
	)
}
